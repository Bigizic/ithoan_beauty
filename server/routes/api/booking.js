const express = require('express');
const router = express.Router();
const multer = require('multer');
const Booking = require('../../models/booking');
const ServiceCategory = require('../../models/service');
const emailService = require('../../services/emailService');
const keys = require('../../config/keys');
const cloudinaryFileStorage = require('../../utils/cloud_file_manager.js');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadType = keys.upload.type;
const { adminEmail, secondAdminEmail } = keys.adminEmail;

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
    selectedDate.setHours(0, 0, 0, 0);

    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDate.getDay()];

    const availability = subService.availability?.find(a => a.day === dayName);

    if (!availability || !availability.timeRanges || availability.timeRanges.length === 0) {
      return res.status(200).json({
        availableTimes: [],
        bookedDates: []
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

    const bookedTimes = bookingsOnDate.map(booking => booking.bookingTime);

    const availableTimes = [];
    availability.timeRanges.forEach(range => {
      const startHour = range.startHour;
      const startMinute = range.startMinute;
      const endHour = range.endHour;
      const endMinute = range.endMinute;

      let currentHour = startHour;
      let currentMinute = startMinute;

      while (
        currentHour < endHour ||
        (currentHour === endHour && currentMinute < endMinute)
      ) {
        const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

        if (!bookedTimes.includes(timeString)) {
          const hour12 = currentHour % 12 || 12;
          const ampm = currentHour >= 12 ? 'PM' : 'AM';
          const formattedTime = `${hour12}:${String(currentMinute).padStart(2, '0')} ${ampm}`;
          availableTimes.push(formattedTime);
        }

        currentMinute += 30;
        if (currentMinute >= 60) {
          currentMinute = 0;
          currentHour += 1;
        }
      }
    });

    const futureBookings = await Booking.find({
      subServiceId: subServiceId,
      bookingDate: { $gte: new Date() },
      status: { $in: ['pending', 'confirmed'] }
    }).distinct('bookingDate');

    return res.status(200).json({
      availableTimes,
      bookedDates: futureBookings
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
      serviceName: updatedBooking.serviceId.name,
      subServiceName: updatedBooking.subServiceId.name,
      price: updatedBooking.totalAmount,
      bookingDate: updatedBooking.bookingDate,
      bookingTime: updatedBooking.bookingTime,
      customerInfo: updatedBooking.customerInfo,
      created: updatedBooking.created
    };

    /*await emailService.sendEmail(
      updatedBooking.customerInfo.email,
      'booking-confirmation',
      bookingData
    );

    if (secondAdminEmail) {
      await emailService.sendEmail(secondAdminEmail, 'admin-booking-confirmation', bookingData);
    }
    if (adminEmail) {
      await emailService.sendEmail(adminEmail, 'admin-booking-confirmation', bookingData);
    }*/

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
    selectedDate.setHours(0, 0, 0, 0);

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

    const newBooking = new Booking({
      serviceId,
      subServiceId,
      bookingDate: selectedDate,
      bookingTime,
      customerInfo: {
        fullName,
        email,
        phoneNumber
      },
      status: 'pending',
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

module.exports = router;