const Mongoose = require('mongoose');
const { Schema } = Mongoose;

const SurveySchema = new Schema({
  source: {
    type: String,
    required: true,
    trim: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Survey', SurveySchema);
