const express = require('express');
const router = express.Router();
const Survey = require('../../models/survey');
const { ROLES } = require('../../constants');
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

router.post('/submit', async (req, res) => {
  try {
    const { source, type } = req.body;

    if (!source || !source.trim()) {
      return res.status(400).json({
        error: 'Source is required.'
      });
    }

    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || '';

    const survey = new Survey({
      source: source.trim(),
      type,
      ipAddress,
      userAgent
    });

    await survey.save();

    return res.status(200).json({
      success: true,
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

router.get('/list', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const surveys = await Survey.find()
      .sort({ created: -1 })
      .limit(limitNum)
      .skip((pageNum - 1) * limitNum);

    const totalCount = await Survey.countDocuments();

    const surveyStats = await Survey.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    return res.status(200).json({
      surveys,
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      stats: surveyStats
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});

module.exports = router;
