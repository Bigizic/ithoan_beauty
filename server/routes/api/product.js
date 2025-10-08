const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mongoose = require('mongoose');
const keys = require('../../config/keys');

// check upload type for either file sytem or amazon s3upload system
const uploadType = keys.upload.type;
const cloudinaryFileStorage = require('../../utils/cloud_file_manager.js');

// Bring in Models & Utils
const Product = require('../../models/product');
const Brand = require('../../models/brand');
const Category = require('../../models/category');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const checkAuth = require('../../utils/auth');
const { s3Upload } = require('../../utils/storage');
const {
  getStoreProductsQuery,
  getStoreProductsWishListQuery
} = require('../../utils/queries');
const { ROLES } = require('../../constants');

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get('/get_product_id/:productId', auth, async (req, res) => {
  try {
    const product = req.params.productId

    const cs = await Product.findOne({ _id: product });

    if (cs) {
      return res.status(200).json({
        success: true,
        product: cs
      })
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/get_all_products', async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 0 } });
    if (products) {
      return res.status(200).json({
        success: true,
        products
      })
    }
  } catch (error) {
    return res.status(400).json({
      error: "There's been an error fetching products please wait"
    });
  }
})

/**
 * - fetches all product with qauntity greater than 0
 */
router.get('/fetch_all_my_product', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 0 } });
    if (products) {
      return res.status(200).json({
        success: true,
        products
      })
    }
  } catch (error) {
    return res.status(400).json({
      error: "There's been an error fetching products please wait"
    });
  }
})


/**
 * returns the minimum price for products and the maximum price for products
 */

router.get('/fetch_product_min_max_price', async (req, res) => {
  try {
    const maxPrice = await Product.find().sort({ price: -1 }).limit(1)
    const minPrice = await Product.find().sort({ price: 1 }).limit(1)
    if (maxPrice && minPrice) {
      return res.status(200).json({
        success: true,
        minPrice: minPrice.map(x => x.price),
        maxPrice: maxPrice.map(x => x.price)
      })
    }
  } catch (error) {
    return res.status(400).json({
      error: "There's been an error fetching max and minimum price from products"
    });
  }
})

// fetch product slug api
router.get('/item/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;

    const productDoc = await Product.findOne({ slug, isActive: true });

    const hasNoBrand =
      productDoc?.brand === null || productDoc?.brand?.isActive === false;

    if (!productDoc || hasNoBrand) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    return res.status(200).json({
      product: productDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch product name search api
router.get('/list/search/:name', async (req, res) => {
  try {
    const name = req.params.name;

    const productDoc = await Product.find(
      { name: { $regex: new RegExp(name), $options: 'is' }, isActive: true },
      { name: 1, slug: 1, imageUrl: 1, price: 1, _id: 1 }
    );
    if (productDoc.length < 0) {
      return res.status(404).json({
        message: 'No product found.'
      });
    }

    return res.status(200).json({
      products: productDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch new arrivals, i.e latest products
router.get('/new_arrivals', async (req, res) => {
  try {
    const products = await Product.find().sort({ created: -1 }).limit(10);
    return res.status(200).json({
      success: true,
      products
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    })
  }
})

// fetch store products by advanced filters api
router.get('/list', async (req, res) => {
  try {
    let {
      sortOrder,
      rating,
      max,
      min,
      category,
      brand,
      page = 1,
      limit = 10
    } = req.query;
    for (const item of Object.keys(sortOrder)) {
      const sm = parseInt(sortOrder[item]);
      sortOrder[item] = sm;
    }

    const categoryFilter = category ? { category } : {};
    const basicQuery = getStoreProductsQuery(min, max, rating);

    const userDoc = await checkAuth(req);
    const categoryDoc = await Category.findOne({
      slug: categoryFilter.category,
      isActive: true
    });

    if (categoryDoc) {
      basicQuery.push({
        $match: {
          isActive: true,
          _id: {
            $in: Array.from(categoryDoc.products)
          }
        }
      });
    }

    const brandDoc = await Brand.findOne({
      slug: brand,
      isActive: true
    });

    if (brandDoc) {
      basicQuery.push({
        $match: {
          'brand._id': { $eq: brandDoc._id }
        }
      });
    }

    let products = null;
    const productsCount = await Product.aggregate(basicQuery);
    const count = productsCount.length;
    const size = count > limit ? page - 1 : 0;
    const currentPage = count > limit ? Number(page) : 1;

    // paginate query
    const paginateQuery = [
      { $sort: sortOrder },
      { $skip: size * limit },
      { $limit: limit * 1 }
    ];

    if (userDoc) {
      const wishListQuery = getStoreProductsWishListQuery(userDoc.id).concat(
        basicQuery
      );
      products = await Product.aggregate(wishListQuery.concat(paginateQuery));
    } else {
      products = await Product.aggregate(basicQuery.concat(paginateQuery));
    }

    return res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage,
      count
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/list/select', auth, async (req, res) => {
  try {
    const products = await Product.find({}, 'name');

    return res.status(200).json({
      products
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// add product api
router.post(
  '/add',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('images', 5),
  async (req, res) => {
    try {
      const sku = req.body.sku;
      const name = req.body.name;
      const description = req.body.description;
      const quantity = req.body.quantity;
      const price = req.body.price;
      const taxable = req.body.taxable;
      const isActive = req.body.isActive;
      const brand = req.body.brand;
      const discountPrice = req.body.discountPrice;

      if (!sku) {
        return res.status(400).json({ error: 'You must enter sku.' });
      }

      if (!description || !name) {
        return res
          .status(400)
          .json({ error: 'You must enter description & name.' });
      }

      if (!quantity) {
        return res.status(400).json({ error: 'You must enter a quantity.' });
      }

      if (!price) {
        return res.status(400).json({ error: 'You must enter a price.' });
      }
      const foundProduct = await Product.findOne({ sku });
      const nameFoundProduct = await Product.findOne({ name })

      if (foundProduct) {
        return res.status(400).json({ error: 'This sku is already in use.' });
      }

      if (nameFoundProduct) { return res.status(400).json({ error: 'Product name already exist, consider changing product name' }) }

      /* 30/11/24 code edit
      to allow image uploads to cloudinary
      */
      let imageUrls = [], imageKey = null;
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          if (uploadType === 'cloud_storage') {
            const result = await cloudinaryFileStorage(file, 'product/');
            imageUrls.push(result.imageUrl);
            imageKey = result.imageKey
          } else {
            const { imageUrl } = await s3Upload(file);
            imageUrls.push(imageUrl);
          }
        }
      }

      const product = new Product({
        sku,
        name,
        description,
        quantity,
        price,
        taxable,
        isActive,
        brand,
        imageUrl: imageUrls,
        imageKey,
        discountPrice
      });

      await product.save();

      return res.status(200).json({
        success: true,
        message: `Product has been added successfully!`,
        product: product
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch products api
router.get(
  '/',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      let products = [];

      if (req.user.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands[0]?.['_id'];

        products = await Product.find({})
          .populate({
            populate: {
              path: 'merchant',
              model: 'Merchant'
            }
          })
          .where('brand', brandId);
      } else {
        products = await Product.find({}).sort('-created');
      }

      return res.status(200).json({
        products
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch product api
router.get(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;

      let productDoc = null;

      if (req.user.merchant) {
        const brands = await Brand.find({
          merchant: req.user.merchant
        }).populate('merchant', '_id');

        const brandId = brands ? brands[0]['_id'] : null;

        productDoc = await Product.findOne({ _id: productId })
          .populate({
            select: 'name'
          })
          .where('brand', brandId);
      } else {
        productDoc = await Product.findOne({ _id: productId })
      }

      if (!productDoc) {
        return res.status(404).json({
          message: 'No product found.'
        });
      }

      return res.status(200).json({
        product: productDoc
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('images', 5),
  async (req, res) => {
    try {
      const productId = req.params.id;
      let update = req.body;
      const query = { _id: productId };
      const { sku, slug } = req.body;

      const { existingImages } = req.body;

      // handle image uploads
      let finalImageUrls = [];

      // Keep existing images if provided
      if (existingImages) {
        try {
          const existing = JSON.parse(existingImages);
          finalImageUrls = Array.isArray(existing) ? existing : [];
        } catch (e) {
          // If parsing fails, ignore existing images
        }
      }

      // Add new uploaded images
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          if (uploadType === 'cloud_storage') {
            const result = await cloudinaryFileStorage(file, 'product/');
            finalImageUrls.push(result.imageUrl);
          } else {
            const { imageUrl } = await s3Upload(file);
            finalImageUrls.push(imageUrl);
          }
        }
      }

      // Update imageUrl only if we have images
      if (finalImageUrls.length > 0) {
        update.imageUrl = finalImageUrls;
      }

      const foundProduct = await Product.findOne({
        $or: [{ slug }, { sku }]
      });

      if (foundProduct && foundProduct._id != productId) {
        return res
          .status(400)
          .json({ error: 'Sku or slug is already in use.' });
      }

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      return res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.put(
  '/:id/active',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const productId = req.params.id;
      const update = req.body.product;
      const query = { _id: productId };

      await Product.findOneAndUpdate(query, update, {
        new: true
      });

      return res.status(200).json({
        success: true,
        message: 'Product has been updated successfully!'
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const product = await Product.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        success: true,
        message: `Product has been deleted successfully!`,
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
