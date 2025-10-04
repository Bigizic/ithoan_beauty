const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const BookingSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Services',
    required: true
  },
  subServiceId: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceGroup',
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  bookingTime: {
    type: String,
    required: true
  },
  customerInfo: {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  paymentReceipt: {
    type: [String],
    default: []
  },
  paymentType: {
    type: String,
    default: 'Transfer'
  },
  note: {
    type: String,
    default: null
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Booking', BookingSchema);
