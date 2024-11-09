const settingsModel = require('../models/settings');

const updateSettings = async (req, res) => {
  const userId = req.params.userId;
  const settings = req.body;
  const updatedSettings = await settingsModel.updateSettings(userId, settings);
  res.json(updatedSettings);
};

module.exports = {
  updateSettings,
};
