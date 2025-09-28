const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// Currency Schema
const Currency = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  currency: {
    type: String,
    required: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Currency', Currency);
