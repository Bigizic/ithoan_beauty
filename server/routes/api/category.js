const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Utils
const Category = require('../../models/category');
const Product = require('../../models/product');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const store = require('../../utils/store');
const { ROLES } = require('../../constants');


router.get('/our_collections', async (req, res) => {
  try {
    const allCategories = await Category.find().sort('-createdAt');
    const products = [];

    for (const item of allCategories) {
      for (const x of item.products) {
        const isProductActive = await Product.findOne({_id: x, isActive: true});
        if (isProductActive) {
          products.push({
            categoryId: item._id,
            categoryName: item.name,
            categorySlug: item.slug,
            product: isProductActive
          });
          break;
        }
      }
    }
    return res.status(200).json({
      success: true,
      products
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});

router.post('/add', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { name, description, products, isActive } = req.body;

    if (!description || !name) {
      return res
        .status(400)
        .json({ error: 'You must enter description & name.' });
    }

    const category = new Category({
      name,
      description,
      products,
      isActive,
    });
    // Save category to the database
    const savedCategory = await category.save();

    return res.status(200).json({
      success: true,
      message: 'Category has been added successfully!',
      category: savedCategory,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
});


// fetch store categories api
router.get('/list', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    return res.status(200).json({
      categories
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch categories api
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({
      categories
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch category api
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    const categoryDoc = await Category.findOne({ _id: categoryId }).populate({
      path: 'products',
      select: 'name'
    });

    if (!categoryDoc) {
      return res.status(404).json({
        message: 'No Category found.'
      });
    }

    return res.status(200).json({
      category: categoryDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const categoryId = req.params.id;
    const update = req.body.category;
    const query = { _id: categoryId };
    const { slug } = req.body.category;

    const foundCategory = await Category.findOne({
      $or: [{ slug }]
    });

    if (foundCategory && foundCategory._id != categoryId) {
      return res.status(400).json({ error: 'Slug is already in use.' });
    }

    await Category.findOneAndUpdate(query, update, {
      new: true
    });

    return res.status(200).json({
      success: true,
      message: 'Category has been updated successfully!'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id/active', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const categoryId = req.params.id;
    const update = req.body.category;
    const query = { _id: categoryId };

    // disable category(categoryId) products
    if (!update.isActive) {
      const categoryDoc = await Category.findOne(
        { _id: categoryId, isActive: true },
        'products -_id'
      ).populate('products');

      store.disableProducts(categoryDoc.products);
    }

    await Category.findOneAndUpdate(query, update, {
      new: true
    });

    return res.status(200).json({
      success: true,
      message: 'Category has been updated successfully!'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
      const product = await Category.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        success: true,
        message: `Category has been deleted successfully!`,
        product
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

module.exports = router;
