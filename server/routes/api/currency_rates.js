const express = require('express');
const router = express.Router();

// Model
const CurrencyRates = require('../../models/currency_rates');


// get currencies
// returns currency rates against usd for ngn and gbp
router.get('/get_currencies', async (req, res) => {
  try {
    const currencies = await CurrencyRates.find();
    if (currencies.length > 0) {
        return res.status(200).json({
            currencies
        })
    } else {
      return res.status(201).json({
        error: "NO currency in db"
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


// add a currency to database
router.post('/add', async (req, res) => {
  try {
  const { rate, base } = req.body;
  let newCurrencyRate, error, datA;

  if (!rate && !base) {
    return res.status(400).json({ error: 'Uploading currency' });
  }

  // create currencyRates object
  // ommit NGN from the Object as NGN is the default price and we don't need it
  for (let key in rate) {
    newCurrencyRate = new CurrencyRates({
      base: key,
      rate: { [key]: rate[key] }
    });
    await newCurrencyRate.save();
  }
  if (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
  return res.status(200).json({
    success: true,
    message: `Currencies has been created successfully!`,
    category: datA,
  });
  } catch (error) {
    return res.status(400).json({
      error: "error adding currency"
    })
  }
});


// edit currency Rates
router.put('/edit', async (req, res) => {
  try {
    const newRate = req.body.rate;
    const update = { $set: {
        rate: newRate}
    };
    const rateKey = Object.keys(newRate);

    const foundRate = await CurrencyRates.findOne({base: String(rateKey[0])});

    if (!foundRate) {
        return res.status(401).json({ error: 'No Rate found' });
    }

    await CurrencyRates.findOneAndUpdate({base: String(rateKey[0])}, update, {
        new: true
    });

    return res.status(200).json({
        success: true,
        message: 'Rate has been updated successfully!'
    });
  } catch (error) {
    return res.status(402).json({
        error: error
    });
  }
});

module.exports = router;
