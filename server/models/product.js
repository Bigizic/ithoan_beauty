const Mongoose = require('mongoose');
const slugify = require('slugify'); // Import slugify
const { Schema } = Mongoose;

// Product Schema
const ProductSchema = new Schema({
  sku: {
    type: String
  },
  name: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  imageKey: {
    type: String,
    default: null
  },
  description: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  },
  discountPrice: {
    type: Number,
    default: 0
  },
  taxable: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

// Middleware to generate slug before saving
ProductSchema.pre('save', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true, // Convert to lowercase
      strict: true, // Remove special characters
      trim: true // Remove leading/trailing spaces
    });
  }
  next();
});

module.exports = Mongoose.model('Product', ProductSchema);