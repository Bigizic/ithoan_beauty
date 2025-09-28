const Mongoose = require('mongoose');

const { Schema } = Mongoose;

// Currency Rates Schema
const CurrencyRatesSchema = new Schema({
  rate: {
    type: Map,
    of: Number,
    required: true
  },
  base: {
    type: String,
    required: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('CurrencyRates', CurrencyRatesSchema);
