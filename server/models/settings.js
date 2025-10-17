const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Settings for site Schema
const SettingSchema = new Schema({
  _id: {
    type: String,
  },
  isMaintenanceMode: {
    beauty: {
      type: Boolean,
      default: false,
    },
    skincare: {
      type: Boolean,
      default: false,
    }
  },
  maintenanceText: {
    beauty: {
      type: String,
      default: '',
    },
    skincare: {
      type: String,
      default: '',
    }
  },
  websiteInfo: {
    type: String,
    default: null
  },
  websiteInfoStatus: {
    type: Boolean,
    default: false
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Setting', SettingSchema);
