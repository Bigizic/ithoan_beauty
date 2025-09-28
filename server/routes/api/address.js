const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Address = require('../../models/address');
const auth = require('../../middleware/auth');

// add address api
router.post('/add', auth, async (req, res) => {
  try {
    const user = req.user;

    // check if a default address already exist for the user
    // as only one address can be set to default
    const checkAddressDefault = await Address.findOne({
      user: user._id,
      isDefault: true
    })

    if (checkAddressDefault && checkAddressDefault.isDefault && req.body.isDefault) {
      return res.status(400).json({
        error: 'Default address exists, try again'
      });
    }

    const address = new Address({
      ...req.body,
      user: user._id
    });
    const addressDoc = await address.save();

    return res.status(200).json({
      success: true,
      message: `Address has been added successfully!`,
      address: addressDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

// fetch all addresses api
router.get('/', auth, async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });

    return res.status(200).json({
      addresses
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const addressId = req.params.id;

    const addressDoc = await Address.findOne({ _id: addressId });

    if (!addressDoc) {
      return res.status(404).json({
        message: `Cannot find Address with the id: ${addressId}.`
      });
    }

    return res.status(200).json({
      address: addressDoc
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const addressId = req.params.id;
    const update = req.body;
    const query = { _id: addressId };

    // check if a default address already exist for the user
    // as only one address can be set to default
    const checkAddressDefault = await Address.findOne({
      user: req.body.user,
      isDefault: true
    })

    if (checkAddressDefault && checkAddressDefault.isDefault && req.body.isDefault) {
      return res.status(400).json({
        error: 'Default address exists, try again'
      });
    }

    await Address.findOneAndUpdate(query, update, {
      new: true
    });

    return res.status(200).json({
      success: true,
      message: 'Address has been updated successfully!'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const address = await Address.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: `Address has been deleted successfully!`,
      address
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
