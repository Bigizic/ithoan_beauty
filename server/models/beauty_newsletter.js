const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const BeautyNewsletterSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  subscribed: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'beauty'
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('BeautyNewsletter', BeautyNewsletterSchema);
