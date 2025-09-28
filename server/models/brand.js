const Mongoose = require('mongoose');
const slugify = require('slugify'); // Import slugify
const { Schema } = Mongoose;

// Brand Schema
const BrandSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    default: null
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

// Middleware to generate slug before saving
BrandSchema.pre('save', async function (next) {
  if (this.name) {
    let slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true
    });

    // Check if a brand with the same slug already exists
    const slugRegex = new RegExp(`^(${slug})((-[0-9]*$)?$`, 'i');
    const brandsWithSlug = await this.constructor.find({ slug: slugRegex });

    if (brandsWithSlug.length) {
      slug = `${slug}-${brandsWithSlug.length + 1}`;
    }

    this.slug = slug;
  }
  next();
});

module.exports = Mongoose.model('Brand', BrandSchema);