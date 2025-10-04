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

// fetch all services api
router.get(
  '/',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const services = await Service.find({}).sort('-created');

      return res.status(200).json({
        services
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch service api
router.get(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const serviceId = req.params.id;

      const serviceDoc = await Service.findOne({ _id: serviceId });

      if (!serviceDoc) {
        return res.status(404).json({
          message: 'No service found.'
        });
      }

      return res.status(200).json({
        service: serviceDoc
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch services select api
router.get('/list/select', auth, async (req, res) => {
  try {
    const services = await Service.find({}, 'name');

    return res.status(200).json({
      services
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// create service
router.post(
  '/add',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('images', 5),
  async (req, res) => {
    try {
      let {
        name, description,
        slug, price,
        discount = 0, duration,
        isActive, serviceGroup,
        isDiscounted = false,
        availability
      } = req.body;
      isActive = JSON.parse(isActive)
      discount = JSON.parse(discount)
      duration = JSON.parse(duration)
      price = JSON.parse(price)

      if (!description || !name) {
        return res.status(400).json({ error: 'name and description are required' });
      }

      if (!price || !duration) {
        return res.status(400).json({ error: 'price and duration are required' });
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

      let parsedAvailability = [];
      if (availability) {
        try {
          parsedAvailability = JSON.parse(availability);
        } catch (e) {
          parsedAvailability = [];
        }
      }

      const newService = new Service({
        name,
        description,
        imageUrl: imageUrls,
        price,
        discount,
        duration,
        isActive,
        isDiscounted,
        availability: parsedAvailability
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
      let {
        name, description,
        slug, price,
        discount, duration,
        isActive, availability,
      } = req.body;
      discount = JSON.parse(discount)
      duration = JSON.parse(duration)
      price = JSON.parse(price)
      const { existingImages } = req.body;

      let updateData = {
        name, description,
        slug, price,
        discount, duration,
        isActive
      };

      // Parse availability if provided
      if (availability) {
        try {
          updateData.availability = JSON.parse(availability);
        } catch (e) {
          // If parsing fails, ignore availability
        }
      }

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
          if (keys.upload.type === 'cloud_storage') {
            const result = await cloudinaryFileStorage(file, 'service/');
            finalImageUrls.push(result.imageUrl);
          } else {
            const { imageUrl } = await s3Upload(file);
            finalImageUrls.push(imageUrl);
          }
        }
      }

      // Update imageUrl only if we have images
      if (finalImageUrls.length > 0) {
        updateData.imageUrl = finalImageUrls;
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