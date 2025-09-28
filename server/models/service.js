const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');

const ServiceSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
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
  availableTime: [
    {
      hour: { type: Number, min: 0, max: 23, required: true },
      minute: { type: Number, min: 0, max: 59, required: true }
    }
  ],
  availableDays: [
    {
      type: String,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
    }
  ],
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

ServiceSchema.pre('save', function (next) {
  if (this.discount) {
    this.discountPrice = this.price - (this.price * this.discount / 100);
  } else {
    this.discountPrice = this.price;
  }
  this.updated = new Date();
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
    });
  }
  next();
});

module.exports = mongoose.model('ServiceCategory', ServiceSchema);
