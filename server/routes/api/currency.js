const express = require('express');
const router = express.Router();

// Bring in Models & Utils
const Currency = require('../../models/currency');
const { ROLES } = require('../../constants');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

// get currency of logged in user
// returns currency of logged in user
router.get('/get_currency/:user_id', async (req, res) => {
  try {
    const reqUserId = req.params.user_id;
    const currency = await Currency.find({ userId: reqUserId });
    if (currency.length > 0) {
      return res.status(200).json({
        success: true,
        currency
      });
    } else {
      return res.status(201).json({
        success: false
      })
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// creates user currency
router.post('/add', async (req, res) => {
  try {
  const { userId, currency } = req.body;

  if (!userId && !currency) {
    return res.status(400).json({ error: 'try again..' });
  }

  // create currency object
  const newUserCurrency = new Currency({
    userId,
    currency,
  });

  await newUserCurrency.save();

  return res.status(200).json({
    success: true,
  });
  } catch (error) {
    return res.status(400).json({
      error: "Currency Error, Your request could not be processed. Please try again.'"
    })
  }
});


// edit currency
router.put('/edit/:user_id', auth, async (req, res) => {
  try {
    const userId = req.params.user_id;
    const query = {userId: userId}
    const update = {
      $set: {
        currency: req.body.newCurrency
      }
    };

    const foundCurrency = await Currency.findOne({userId: userId});

    if (!foundCurrency) {
        return res.status(400).json({ error: 'No Currency found' });
    }

    await Currency.findOneAndUpdate(query, update, {
        new: true
    });

    return res.status(200).json({
        success: true,
        message: 'Currency for user has been updated successfully!'
    });
  } catch (error) {
    return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
