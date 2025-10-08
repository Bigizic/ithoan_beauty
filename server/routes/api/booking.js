const express = require('express');
const router = express.Router();
const multer = require('multer');
const Booking = require('../../models/booking');
const ServiceCategory = require('../../models/service');
const Services = require('../../models/services');
const emailService = require('../../services/emailService');
const keys = require('../../config/keys');
const cloudinaryFileStorage = require('../../utils/cloud_file_manager.js');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadType = keys.upload.type;
const { adminEmail, secondAdminEmail } = keys.adminEmail;

const generateBookingHash = () => {
  const characters = '0123456789';
  let hash = '';
  for (let i = 0; i < 8; i++) {
    hash += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return hash;
};

const generateUniqueBookingHash = async () => {
  let hash;
  let isUnique = false;

  while (!isUnique) {
    hash = generateBookingHash();
    const existing = await Booking.findOne({ bookingHash: hash });
    if (!existing) {
      isUnique = true;
    }
  }

  return hash;
};

router.get('/available-times', async (req, res) => {
  try {
    const { subServiceId, date } = req.query;

    if (!subServiceId || !date) {
      return res.status(400).json({
        error: 'subServiceId and date are required'
      });
    }

    const subService = await ServiceCategory.findById(subServiceId);
    if (!subService) {
      return res.status(404).json({
        error: 'Sub service not found'
      });
    }
    const selectedDate = new Date(date);
    selectedDate.setUTCHours(23, 59, 59, 999);

    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDate.getDay()];

    const availability = subService.availability?.find(a => a.day === dayName);

    if (!availability || !availability.timeRanges || availability.timeRanges.length === 0) {
      return res.status(200).json({
        availableTimes: []
      });
    }

    const startOfDay = new Date(selectedDate);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const bookingsOnDate = await Booking.find({
      subServiceId: subServiceId,
      bookingDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    const currentDate = new Date();
    const isToday = selectedDate.toDateString() === currentDate.toDateString();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const serviceDuration = subService.duration;
    const intervalMinutes = serviceDuration;

    const availableTimes = [];

    availability.timeRanges.forEach(range => {
      const startHour = range.startHour;
      const startMinute = range.startMinute;
      const endHour = range.endHour;
      const endMinute = range.endMinute;

      let currentSlotHour = startHour;
      let currentSlotMinute = startMinute;

      while (true) {
        const currentSlotTotalMinutes = currentSlotHour * 60 + currentSlotMinute;
        const endSlotTotalMinutes = currentSlotTotalMinutes + serviceDuration;
        const endSlotHour = Math.floor(endSlotTotalMinutes / 60);
        const endSlotMinute = endSlotTotalMinutes % 60;

        const rangeTotalMinutes = endHour * 60 + endMinute;

        if (endSlotTotalMinutes > rangeTotalMinutes) {
          break;
        }

        if (isToday) {
          const slotStartTotalMinutes = currentSlotHour * 60 + currentSlotMinute;
          const nowTotalMinutes = currentHour * 60 + currentMinute;

          if (slotStartTotalMinutes < nowTotalMinutes) {
            currentSlotMinute += intervalMinutes;
            if (currentSlotMinute >= 60) {
              currentSlotHour += Math.floor(currentSlotMinute / 60);
              currentSlotMinute = currentSlotMinute % 60;
            }
            continue;
          }
        }

        const timeString = `${String(currentSlotHour).padStart(2, '0')}:${String(currentSlotMinute).padStart(2, '0')}`;

        const isBooked = bookingsOnDate.some(booking => {
          const bookedTime = booking.bookingTime;
          const [bookedTimeStr] = bookedTime.split(' ');
          const [bookedHourStr, bookedMinuteStr] = bookedTimeStr.split(':');
          let bookedHour = parseInt(bookedHourStr);
          const bookedMinute = parseInt(bookedMinuteStr);

          if (bookedTime.includes('PM') && bookedHour !== 12) {
            bookedHour += 12;
          } else if (bookedTime.includes('AM') && bookedHour === 12) {
            bookedHour = 0;
          }

          const bookedStartMinutes = bookedHour * 60 + bookedMinute;
          const bookedEndMinutes = bookedStartMinutes + serviceDuration;
          const slotStartMinutes = currentSlotHour * 60 + currentSlotMinute;
          const slotEndMinutes = slotStartMinutes + serviceDuration;

          return (slotStartMinutes < bookedEndMinutes && slotEndMinutes > bookedStartMinutes);
        });

        if (!isBooked) {
          const hour12 = currentSlotHour % 12 || 12;
          const ampm = currentSlotHour >= 12 ? 'PM' : 'AM';
          const formattedTime = `${hour12}:${String(currentSlotMinute).padStart(2, '0')} ${ampm}`;
          availableTimes.push(formattedTime);
        }

        currentSlotMinute += intervalMinutes;
        if (currentSlotMinute >= 60) {
          currentSlotHour += Math.floor(currentSlotMinute / 60);
          currentSlotMinute = currentSlotMinute % 60;
        }
      }
    });

    if (availableTimes.length === 0) {
      return res.status(200).json({
        availableTimes: [],
        message: 'No available bookings on this day'
      });
    }

    return res.status(200).json({
      availableTimes
    });
  } catch (error) {
    console.log('Error fetching available times:', error);
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/payment', upload.fields([
  { name: 'image_0', maxCount: 1 },
]), async (req, res) => {
  try {
    const images = req.files;
    const bookingId = req.body.bookingId;
    const note = req.body.note || null;

    if (!images || !bookingId) {
      return res.status(400).json({ error: 'Please upload an image' });
    }

    let imagesList = [];

    if (uploadType === 'cloud_storage' && images) {
      for (const key in images) {
        const image = images[key][0];
        const result = await cloudinaryFileStorage(image, 'booking_receipts/');
        imagesList.push(result.imageUrl);
      }
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        $set: {
          paymentReceipt: imagesList,
          paymentStatus: 'paid',
          paymentType: 'Transfer',
          note,
          status: 'pending',
          updated: Date.now()
        }
      },
      { new: true }
    ).populate('serviceId subServiceId');

    if (!updatedBooking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const bookingData = {
      _id: updatedBooking._id,
      bookingHash: updatedBooking.bookingHash,
      serviceName: updatedBooking.serviceId.name,
      subServiceName: updatedBooking.subServiceId.name,
      price: updatedBooking.totalAmount,
      bookingDate: updatedBooking.bookingDate,
      bookingTime: updatedBooking.bookingTime,
      customerInfo: updatedBooking.customerInfo,
      created: updatedBooking.created
    };

    await emailService.sendEmail(
      updatedBooking.customerInfo.email,
      'booking-confirmation',
      bookingData
    );

    if (secondAdminEmail) {
      await emailService.sendEmail(secondAdminEmail, 'admin-booking-confirmation', bookingData);
    }
    if (adminEmail) {
      await emailService.sendEmail(adminEmail, 'admin-booking-confirmation', bookingData);
    }

    return res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      booking: updatedBooking
    });
  } catch (error) {
    console.log('Error processing payment:', error);
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    const {
      serviceId,
      subServiceId,
      bookingDate,
      bookingTime,
      fullName,
      email,
      phoneNumber
    } = req.body;

    if (!serviceId || !subServiceId || !bookingDate || !bookingTime) {
      return res.status(400).json({
        error: 'Service, sub service, date, and time are required'
      });
    }

    if (!fullName || !email || !phoneNumber) {
      return res.status(400).json({
        error: 'Full name, email, and phone number are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        error: 'Please provide a valid phone number'
      });
    }

    const subService = await ServiceCategory.findById(subServiceId);
    if (!subService) {
      return res.status(404).json({
        error: 'Sub service not found'
      });
    }

    const selectedDate = new Date(bookingDate);
    selectedDate.setUTCHours(23, 59, 59, 999);

    const startOfDay = new Date(selectedDate);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingBooking = await Booking.findOne({
      subServiceId: subServiceId,
      bookingDate: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      bookingTime: bookingTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        error: 'This time slot is no longer available. Please select another time.'
      });
    }

    const bookingHash = await generateUniqueBookingHash();

    const newBooking = new Booking({
      serviceId,
      subServiceId,
      bookingDate: selectedDate,
      bookingTime,
      bookingHash,
      customerInfo: {
        fullName,
        email,
        phoneNumber
      },
      status: 'unpaid',
      totalAmount: subService.price
    });

    await newBooking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: newBooking
    });
  } catch (error) {
    console.log('Error creating booking:', error);
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/list', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { bookingHash: { $regex: search, $options: 'i' } },
        { 'customerInfo.fullName': { $regex: search, $options: 'i' } },
        { 'customerInfo.email': { $regex: search, $options: 'i' } }
      ];
    }

    const bookings = await Booking.find(query)
      .populate('serviceId subServiceId')
      .sort({ created: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Booking.countDocuments(query);

    return res.status(200).json({
      bookings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalBookings: count
    });
  } catch (error) {
    console.log('Error fetching bookings:', error);
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/:id', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate('serviceId subServiceId');

    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found'
      });
    }

    return res.status(200).json({
      booking
    });
  } catch (error) {
    console.log('Error fetching booking:', error);
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      serviceId,
      subServiceId,
      bookingDate,
      bookingTime,
      status,
      fullName,
      email,
      phoneNumber,
      note
    } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found'
      });
    }

    const previousStatus = booking.status;

    const updateData = {
      updated: Date.now()
    };

    if (serviceId) updateData.serviceId = serviceId;
    if (subServiceId) updateData.subServiceId = subServiceId;
    if (bookingDate) {
      const selectedDate = new Date(bookingDate);
      //selectedDate.setUTCHours(23, 59, 59, 999);
      updateData.bookingDate = selectedDate;
    }
    if (bookingTime) updateData.bookingTime = bookingTime;
    if (status) updateData.status = status;
    if (note) updateData.note = note;

    if (fullName || email || phoneNumber) {
      updateData.customerInfo = {
        fullName: fullName || booking.customerInfo.fullName,
        email: email || booking.customerInfo.email,
        phoneNumber: phoneNumber || booking.customerInfo.phoneNumber
      };
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).populate('serviceId subServiceId');

    if (status === 'confirmed' && previousStatus !== 'confirmed') {
      const bookingData = {
        _id: updatedBooking._id,
        bookingHash: updatedBooking.bookingHash,
        serviceName: updatedBooking.serviceId.name,
        subServiceName: updatedBooking.subServiceId.name,
        price: updatedBooking.totalAmount,
        bookingDate: updatedBooking.bookingDate,
        bookingTime: updatedBooking.bookingTime,
        customerInfo: updatedBooking.customerInfo,
        created: updatedBooking.created
      };

      try {
        await emailService.sendEmail(
          updatedBooking.customerInfo.email,
          'booking-confirm',
          bookingData
        );
      } catch (emailError) {
        console.log('Error sending confirmation email:', emailError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking: updatedBooking
    });
  } catch (error) {
    console.log('Error updating booking:', error);
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/:id', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        error: 'Booking not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.log('Error deleting booking:', error);
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
