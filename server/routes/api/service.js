const express = require('express');
const router = express.Router();
const multer = require('multer');
const keys = require('../../config/keys');
const cloudinaryFileStorage = require('../../utils/cloud_file_manager.js');
const { s3Upload } = require('../../utils/storage');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');

const Service = require('../../models/service'); // treatment

const storage = multer.memoryStorage();
const upload = multer({ storage });

// create service
router.post(
  '/add',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('images', 5),
  async (req, res) => {
    try {
      const {
        name, description,
        slug, price,
        discount = 0, duration,
        isActive, serviceGroup,
        isDiscounted = false
      } = req.body;

      if (!description || !name) {
        return res.status(400).json({ error: 'name and description are required' });
      }

      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          if (keys.upload.type === 'cloud_storage') {
            const result = await cloudinaryFileStorage(file, 'service/');
            imageUrls.push(result.imageUrl);
          } else {
            const { imageUrl } = await s3Upload(file);
            imageUrls.push(imageUrl);
          }
        }
      }

      //const discountPrice = discount > 0 ? price - (price * discount / 100) : price;

      const newService = new Service({
        service: serviceGroup,
        name,
        slug,
        description,
        imageUrls,
        price,
        discount,
        //discountPrice,
        duration,
        isActive,
        isDiscounted
      });

      await newService.save();

      return res.status(200).json({
        success: true,
        message: 'service created successfully',
        service: newService
      });
    } catch (err) {
      return res.status(400).json({ error: 'could not create service' });
    }
  }
);

// update service
router.put(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('images', 5),
  async (req, res) => {
    try {
      const { name, description, slug, price, discount, duration, isActive } = req.body;

      let updateData = { name, description, slug, price, discount, duration, isActive };

      if (price && discount >= 0) {
        updateData.discountPrice = discount > 0 ? price - (price * discount / 100) : price;
      }

      if (req.files && req.files.length > 0) {
        let imageUrls = [];
        for (const file of req.files) {
          if (keys.upload.type === 'cloud_storage') {
            const result = await cloudinaryFileStorage(file, 'service/');
            imageUrls.push(result.imageUrl);
          } else {
            const { imageUrl } = await s3Upload(file);
            imageUrls.push(imageUrl);
          }
        }
        updateData.imageUrls = imageUrls;
      }

      const updatedDoc = await Service.findOneAndUpdate(
        { _id: req.params.id },
        updateData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: 'service updated successfully',
        service: updatedDoc
      });
    } catch (err) {
      return res.status(400).json({ error: 'could not update service' });
    }
  }
);

// delete service
router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const deleted = await Service.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: 'service deleted successfully',
        deleted
      });
    } catch (err) {
      return res.status(400).json({ error: 'could not delete service' });
    }
  }
);

module.exports = router;
