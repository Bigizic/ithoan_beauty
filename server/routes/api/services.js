const express = require('express');
const router = express.Router();
const multer = require('multer');
const keys = require('../../config/keys');
const cloudinaryFileStorage = require('../../utils/cloud_file_manager.js');
const { s3Upload } = require('../../utils/storage');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');

const Services = require('../../models/services');
const ServiceGroup = require('../../models/service')
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get(
  '/fetch/:id',
  async (req, res) => {
    try {
      const id = req.params.id
      const service = await Services.findOne(
        {
          slug: id,
          isActive: true
        }
      )
        .populate({
          path: 'serviceArray',
          match: { isActive: true }
        });
      return res.status(200).json({
        service
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
)

router.get(
  '/fetch_all',
  async (req, res) => {
    try {
      const services = await Services.find({ isActive: true }).populate({
        path: 'serviceArray',
        match: { isActive: true }
      });
      return res.status(200).json({
        services
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
)

// fetch all services groups api
router.get(
  '/',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const servicesList = await Services.find({}).sort('-created');

      return res.status(200).json({
        services: servicesList
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch services group api
router.get(
  '/:id',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  async (req, res) => {
    try {
      const servicesId = req.params.id;

      const servicesDoc = await Services.findOne({ _id: servicesId }).populate({
        path: 'serviceArray',
        select: 'name'
      });

      if (!servicesDoc) {
        return res.status(404).json({
          message: 'No services found.'
        });
      }

      return res.status(200).json({
        services: servicesDoc
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
  }
);

// fetch services list for public (booking page)
router.get('/list', async (req, res) => {
  try {
    const services = await Services.find({ isActive: true })
      .select('_id name slug description title imageUrl serviceArray')
      .sort('-created')
      .populate({
        path: 'serviceArray',
        match: { isActive: true }
      })

    return res.status(200).json({
      services
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch services select api
router.get('/list/select', auth, async (req, res) => {
  try {
    const services = await Services.find({}, 'name');

    return res.status(200).json({
      services
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch service by slug for public
router.get('/slug/:slug', async (req, res) => {
  try {
    const serviceDoc = await ServiceGroup.findOne({
      slug: req.params.slug,
      isActive: true
    });

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
});

// create a services
router.post(
  '/add',
  auth,
  role.check(ROLES.Admin, ROLES.Merchant),
  upload.array('images', 5),
  async (req, res) => {
    try {
      let {
        name, description,
        isActive,
        title, serviceArray = []
      } = req.body;
      isActive = JSON.parse(isActive)
      serviceArray = JSON.parse(serviceArray)

      if (!description) {
        return res.status(400).json({ error: 'description is required' });
      }

      const servicesDoc = await Services.findOne({ name })

      if (servicesDoc) {
        return res.status(400).json({ error: 'a services with same name already exist' })
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

      const newServices = new Services({
        name,
        title,
        description,
        imageUrl: imageUrls,
        isActive,
        serviceArray
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
      let { name, description, isActive, title, serviceArray = [] } = req.body;
      let { existingImages } = req.body;
      isActive = JSON.parse(isActive)
      serviceArray = JSON.parse(serviceArray)

      let updateData = { name, description, isActive, title };

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
          if (keys.upload.type === 'cloud_storage') {
            const result = await cloudinaryFileStorage(file, 'services/');
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

      if (Array.isArray(serviceArray)) {
        updateData.serviceArray = serviceArray;
      }

      const updatedDoc = await Services.findOneAndUpdate(
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
      const deleted = await Services.deleteOne({ _id: req.params.id });
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