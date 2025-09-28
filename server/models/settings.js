const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Settings for site Schema
const SettingSchema = new Schema({
  _id: {
    type: String,
  },
  isMaintenanceMode:{
    type: Boolean,
    default: false,
  },
  maintenanceText: {
    type: String,
    default: null
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
