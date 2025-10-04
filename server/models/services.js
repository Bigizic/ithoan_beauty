const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const slugify = require('slugify');

const ServicesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
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
  serviceArray: [{ type: Schema.Types.ObjectId, ref: 'ServiceGroup' }],
  updated: Date
});

// pre save hook for slug
ServicesSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }

  this.updated = new Date();
  next();
});

// pre findOneAndUpdate hook for slug
ServicesSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (!update) return next();

  if (update.name) {
    update.slug = slugify(update.name, {
      lower: true,
      strict: true,
    });
  }

  update.updated = new Date();
  this.setUpdate(update);
  next();
});

module.exports = Mongoose.model('Services', ServicesSchema);
