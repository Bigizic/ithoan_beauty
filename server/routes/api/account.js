const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Account = require('../../models/account');
const auth = require('../../middleware/auth');
const { ROLES } = require('../../constants');
const role = require('../../middleware/role');


// return all bank account
router.get('/', auth, async (req, res) => {
  try {
    const banks = await Account.find();

    return res.status(200).json({
        success: true,
        banks,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


router.post('/create', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
      const { bankName, accountNumber, nameOnAccount  } = req.body;

      if (!bankName) {
        return res.status(400).json({
            error: "Please include a bank name"
        })
      }
      if (!accountNumber) {
        return res.status(400).json({
            error: "Please include an account number"
        })
      }

      if (!nameOnAccount) {
        return res.status(400).json({
            error: "Please include an account name"
        })
      }

      const existingBank = await Account.findOne({ number: accountNumber });

      if (existingBank) {
        return res.status(400).json({
            error: "Cannot create bank, bank already exists"
        })
      }

      // create a bank
      const newBank = new Account({
        bank_name: bankName,
        number: accountNumber,
        name: nameOnAccount
      })

      await newBank.save()
  
      return res.status(200).json({
          success: true,
          bank: newBank,
      });
    } catch (error) {
      return res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
    }
});


router.delete('/delete/:id', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            await Account.findByIdAndDelete(id)
            return res.status(200).json({
                success: true,
                message: "Successfully deleted"
            })
        } else {
            return res.status(400).json({
                error: "Cannot delete bank, bank id not found"
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
    }
})

module.exports = router;
