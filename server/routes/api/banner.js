const express = require('express');
const router = express.Router();
const multer = require('multer');
const Mongoose = require('mongoose');
const keys = require('../../config/keys');

// check upload type for either file sytem or amazon s3upload system
const uploadType = keys.upload.type;
const cloudinaryFileStorage = require('../../utils/cloud_file_manager.js')
// Bring in Models & Utils
const Banner = require('../../models/banner');
const { ROLES } = require('../../constants');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

const storage = multer.memoryStorage();
const upload = multer({ storage });


// get banners
// returns all banners
router.get('/get_banners', async (req, res) => {
  try {
    const banners = await Banner.find();
    return res.status(200).json({
        banners
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch a banner api
router.get(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const bannerId = req.params.id;

      let bannerDoc = await Banner.findOne({ _id: bannerId });

      if (!bannerDoc) {
        return res.status(404).json({
          message: 'No product found.'
        });
      }

      return res.status(200).json({
        banner: bannerDoc
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);


// upload banners
// add a banner to database and upload a banner to storage type
router.post('/add', auth, role.check(ROLES.Admin), upload.single('image'), async (req, res) => {
  try {
  const image = req.file;
  const { isActive, isDefault } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'You must upload an Image.' });
  }

  // check image type if it matches allowed image types
  // Also check if image doesn't exceed 20mb
  const allowedImageTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
  ];
  // allowed image type check
  if (!allowedImageTypes.includes(image.mimetype)) {
    return res.status(400).json({ error: 'Upload a jpeg, gif or png image.' });
  }
  // 20mb check
  if (image.size > 20 * 1024 * 1024) {
    return res.status(400).json({ error: 'Image must not be greater than 20mb' });
  }

  // check if Banner Model has a record with is Default "treu" as we want only one
  // default banner
  const findIsDefaultBanner = await Banner.findOne({ isDefault: true });

  if (findIsDefaultBanner && findIsDefaultBanner.isDefault && isDefault === 'true') {
    return res.status(400).json({ error: 'A default banner already exist' })
  }

  // upload image to file storage type
  let imageUrl, imageKey;
  try {
    if (uploadType === 'cloud_storage') {
      const result = await cloudinaryFileStorage(image, 'banners/');
      imageUrl = result.imageUrl;
      imageKey = result.imageKey;
    } else {
      const { imageUrl: s3ImageUrl, imageKey: s3ImageKey } = await s3Upload(image);
      imageUrl = s3ImageUrl;
      imageKey = s3ImageKey;
    }
  } catch (error) {
    return res.status(400).json({ error: 'Error uploading image, Try again or refresh browser' });
  };

  // create banner object
  const banner = new Banner({
    imageUrl,
    imageKey,
    isDefault,
    isActive
  });

  await banner.save();

  return res.status(200).json({
    success: true,
    message: `Banner has been created successfully!`,
    category: banner
  });
  } catch(error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
  }
});


// delete banners
// delete a banner from database
router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin),
  async (req, res) => {
    try {
        // check if banner is default before deleting
        const bannerDefault = await Banner.findOne({ _id: req.params.id });
        if (bannerDefault.isDefault) {
          return res.status(400).json({
            error: "remove banner from default before deleting"
          });
        }
        const banner = await Banner.deleteOne({ _id: req.params.id });

        return res.status(200).json({
            success: true,
            message: `Banner has been deleted successfully!`,
            banner
        });
    } catch (error) {
      return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
  }
);


// edit banners
router.put('/edit/:id', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const bannerId = req.params.id;
    const update = req.body.newBanner;
    const query = { _id: bannerId };

    // check if query parameter = "{ isDefault: true }"
    // if it matches also check if a record of "{ isDefault: true }"
    // exists in the db, as we can only have one is default
    const findIsDefaultBanner = await Banner.findOne({ isDefault: true });
    if (findIsDefaultBanner && update.isDefault === true) {
     return res.status(400).json({ error: 'A default banner already exist' });
    }

    const foundBanner = await Banner.findOne({_id: bannerId});

    if (!foundBanner) {
        return res.status(400).json({ error: 'No banner found' });
    }

    await Banner.findOneAndUpdate(query, update, {
        new: true
    });

    return res.status(200).json({
        success: true,
        message: 'Banner has been updated successfully!'
    });
  } catch (error) {
    return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
