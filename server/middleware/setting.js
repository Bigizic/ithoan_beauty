const Settings = require('../models/settings');

const chcekSetting = async () => {
  try {
    const setting = await Settings.findOne({ _id: "settings", isMaintenanceMode: true });
    return setting || null;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};

module.exports = chcekSetting;
