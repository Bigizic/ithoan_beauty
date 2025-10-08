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
  isPopup: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: 'Shop Now'
  },
  linkType: {
    type: String,
    enum: ['shop', 'category'],
    default: 'shop'
  },
  categorySlug: {
    type: String,
    default: ''
  },
  displayDuration: {
    type: Number,
    default: 5
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Banner', BannerSchema);
