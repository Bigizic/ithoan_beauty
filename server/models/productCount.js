const Mongoose = require('mongoose');


const { Schema } = Mongoose;

// product count Schema
const productCount = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    default: null
  },
  count: {
    type: Number,
    default: 0
  },
  boughtCount: {
    type: Number,
    default: 0
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('productCount', productCount);
