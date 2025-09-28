const Mongoose = require('mongoose');


const { Schema } = Mongoose;

// product count Schema
const Account = new Schema({
  number: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  bank_name: {
    type: String,
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('account', Account);
