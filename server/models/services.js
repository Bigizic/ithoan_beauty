const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');
const service = require('./service');

const ServicesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  title: String,
  imageUrl: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  serviceArray: [service],
  updated: Date
});
ServicesSchema.pre('save', async function (next) {
  this.updated = new Date();
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
})

module.exports = mongoose.model('Service', ServicesSchema);
