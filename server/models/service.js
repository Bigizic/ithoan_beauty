const Mongoose = require('mongoose');
const { Schema } = Mongoose;
const slugify = require('slugify');

const TimeRangeSchema = new Schema({
  startHour: { type: Number, min: 0, max: 23, required: true },
  startMinute: { type: Number, min: 0, max: 59, required: true },
  endHour: { type: Number, min: 0, max: 23, required: true },
  endMinute: { type: Number, min: 0, max: 59, required: true }
}, { _id: false });

const DayAvailabilitySchema = new Schema({
  day: {
    type: String,
    enum: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    required: true
  },
  timeRanges: [TimeRangeSchema]
}, { _id: false });

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
  },
  description: String,
  imageUrl: [String],
  price: {
    type: Number,
    required: true
  },
  isDiscounted: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    required: true
  },
  availability: [DayAvailabilitySchema],
  isActive: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

// pre save hook for slug + discount
ServiceSchema.pre('save', function (next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  if (this.discount && this.price) {
    this.discountPrice = this.price - (this.price * this.discount / 100);
  } else if (this.price) {
    this.discountPrice = this.price;
  }

  this.updated = new Date();
  next();
});

// pre findOneAndUpdate hook
ServiceSchema.pre('findOneAndUpdate', function (next) {
  let update = this.getUpdate();
  if (!update) return next();

  if (update.discount && update.price) {
    update.discountPrice = update.price - (update.price * update.discount / 100);
  } else if (update.price) {
    update.discountPrice = update.price;
  }

  update.updated = new Date();

  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }

  this.setUpdate(update);
  next();
});

module.exports = Mongoose.model('ServiceGroup', ServiceSchema);
