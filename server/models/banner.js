const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Banner Schema
const BannerSchema = new Schema({
  imageUrl: {
    type: String
  },
  imageKey: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Banner', BannerSchema);
