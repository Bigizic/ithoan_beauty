const Mongoose = require('mongoose');
const slugify = require('slugify'); // Import slugify
const { Schema } = Mongoose;

// Category Schema
const CategorySchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
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
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

// Middleware to generate slug before saving
CategorySchema.pre('save', async function (next) {
  if (this.name) {
    let slug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true
    });

    // Check if a category with the same slug already exists
    const slugRegex = new RegExp(`^(${slug})((-[0-9]*$)?)$`, 'i');
    const categoriesWithSlug = await this.constructor.find({ slug: slugRegex });

    if (categoriesWithSlug.length) {
      slug = `${slug}-${categoriesWithSlug.length + 1}`;
    }

    this.slug = slug;
  }
  next();
});

module.exports = Mongoose.model('Category', CategorySchema);