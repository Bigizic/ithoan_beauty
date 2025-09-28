const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Website visit Schema
const VisitSchema = new Schema({
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Mongoose.model('Visit', VisitSchema);
