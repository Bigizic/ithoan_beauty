const express = require('express');
const router = express.Router();
const multer = require('multer');
const keys = require('../../config/keys');
const cloudinaryFileStorage  = require('../../utils/cloud_file_manager.js');
const { s3Upload } = require('../../utils/storage');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');

const ServiceGroup = require('../../models/services');
const Service = require('../../models/service');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// create a services
router.post(
  '/add',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('images', 5),
  async (req, res) => {
    try {
      const {
        name, description,
        slug, isActive,
        title, serviceArray = [],
      } = req.body;

      if (!description) {
        return res.status(400).json({ error: 'description is required' });
      }

      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          if (keys.upload.type === 'cloud_storage') {
            const result = await cloudinaryFileStorage(file, 'services/');
            imageUrls.push(result.imageUrl);
          } else {
            const { imageUrl } = await s3Upload(file);
            imageUrls.push(imageUrl);
          }
        }
      }

      const newServices = new ServiceGroup({
        name,
        slug,
        description,
        imageUrl: imageUrls,
        isActive,
        services
      });

      await newServices.save();

      return res.status(200).json({
        success: true,
        message: 'services created successfully',
        services: newServices
      });
    } catch (err) {
      return res.status(400).json({
        error: 'could not create services'
      });
    }
  }
);

// update a services
router.put(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('images', 5),
  async (req, res) => {
    try {
      const { name, description, slug, isActive, addService = [], removeService = [], service = [] } = req.body;

      let updateData = { name, description, slug, isActive };

      // handle image uploads
      if (req.files && req.files.length > 0) {
        let imageUrls = [];
        for (const file of req.files) {
          if (keys.upload.type === 'cloud_storage') {
            const result = await cloudinaryFileStorage(file, 'services/');
            imageUrls.push(result.imageUrl);
          } else {
            const { imageUrl } = await s3Upload(file);
            imageUrls.push(imageUrl);
          }
        }
        updateData.imageUrl = imageUrls;
      }

      const doc = await ServiceGroup.findById(req.params.id);
      if (!doc) {
        return res.status(404).json({ error: 'services not found' });
      }

      // update service relations
      let updatedServices = [...doc.services];
      if (Array.isArray(addService)) {
        updatedServices.push(...addService);
      }
      if (Array.isArray(removeService)) {
        updatedServices = updatedServices.filter(s => !removeService.includes(String(s)));
      }
      if (Array.isArray(service) && service.length > 0) {
        updatedServices = service;
      }

      updateData.services = [...new Set(updatedServices)];

      const updatedDoc = await ServiceGroup.findOneAndUpdate(
        { _id: req.params.id },
        updateData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: 'services updated successfully',
        services: updatedDoc
      });
    } catch (err) {
      return res.status(400).json({
        error: 'could not update services'
      });
    }
  }
);

// delete a services
router.delete(
  '/delete/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const deleted = await ServiceGroup.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        success: true,
        message: 'services deleted successfully',
        deleted
      });
    } catch (err) {
      return res.status(400).json({ error: 'could not delete services' });
    }
  }
);

module.exports = router;
