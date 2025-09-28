const router = require('express').Router();
const apiRoutes = require('./api');
// const { isAlive } = require('../utils/db');
// const chcekSetting = require('../middleware/setting');
// const path = require('path');

const keys = require('../config/keys');
const { apiURL } = keys.app;

const api = `/${apiURL}`;

// middleware to check maintenance mode
/*router.use(async (req, res, next) => {
  const settings = await chcekSetting();
  if (settings && settings.isMaintenanceMode) {
    return res.status(503).sendFile(path.join(__dirname, '503/index.html')); // Serve a static maintenance page
  }
  next();
});*/

/*router.get('/api/status', async (req, res) => {
  try {
    const isActive = await isAlive();
    if (isActive) {
      return res.status(200).json({ status: 'active', message: 'Server is active' });
    } else {
      return res.status(500).json({ status: 'inactive', message: 'Server is not active' });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'An unexpected error occurred' });
  }
});*/

// api routes
router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json('No API route found'));

module.exports = router;
