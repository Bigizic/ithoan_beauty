const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');
const { ROLES } = require('../../constants');
const emailQueueManager = require('../../utils/emailQueue');

// Get queue statistics
router.get('/stats', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const stats = await emailQueueManager.getQueueStats();
    return res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to get queue statistics'
    });
  }
});

// Clean queue
router.post('/clean', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    await emailQueueManager.cleanQueue();
    return res.status(200).json({
      success: true,
      message: 'Queue cleaned successfully'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to clean queue'
    });
  }
});

// Pause queue
router.post('/pause', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    await emailQueueManager.pauseQueue();
    return res.status(200).json({
      success: true,
      message: 'Queue paused successfully'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to pause queue'
    });
  }
});

// Resume queue
router.post('/resume', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    await emailQueueManager.resumeQueue();
    return res.status(200).json({
      success: true,
      message: 'Queue resumed successfully'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to resume queue'
    });
  }
});

// Get failed jobs
router.get('/failed', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    const failedJobs = await emailQueueManager.getFailedJobs();
    return res.status(200).json({
      success: true,
      failedJobs: failedJobs.map(job => ({
        id: job.id,
        data: job.data,
        failedReason: job.failedReason,
        processedOn: job.processedOn,
        finishedOn: job.finishedOn
      }))
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to get failed jobs'
    });
  }
});

// Retry failed jobs
router.post('/retry-failed', auth, role.check(ROLES.Admin), async (req, res) => {
  try {
    await emailQueueManager.retryFailedJobs();
    return res.status(200).json({
      success: true,
      message: 'Failed jobs retried successfully'
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to retry failed jobs'
    });
  }
});

module.exports = router;