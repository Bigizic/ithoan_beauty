const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Order Schema
/*const OrderSchema = new Schema({
  _id: {
    type: String,
    auto: true,
    default: Schema.ObjectId,
  },
  currency: {
    type: String
  },
  deliveryType: {
    type: String,
    default: null,
  },
  address: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
  },
  phoneNumber: {
    type: String,
  },
  payStackReference: {
    type: String,
    default: null,
  },
  payStackId: {
    type: String,
    default: null,
  },
  paymentFees: {
    type: Number,
    default: 0
  },
  paymentType: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  edited: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number,
    default: 0,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});*/


const OrderSchema = new Schema({
  _id: {
    type: String,
    auto: true,
    default: Schema.ObjectId,
  },
  currency: {
    type: String
  },
  deliveryType: {
    type: String,
    default: null,
  },
  address: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
  },
  phoneNumber: {
    type: String,
  },
  paymentType: {
    type: String,
    default: null,
  },
  paymentStatus: {
    type: String,
    default: null,
  },
  paymentReceipt: {
    type: [String],
    default: null,
  },
  status: {
    type: String,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  edited: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number,
    default: 0,
  },
  note: {
    type: String,
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Order', OrderSchema);
