const reminderModel = require('../models/reminder');

const getAllReminders = async (req, res) => {
  const reminders = await reminderModel.getAllReminders();
  res.json(reminders);
};

const addReminder = async (req, res) => {
  const reminder = req.body;
  const newReminder = await reminderModel.addReminder(reminder);
  res.json(newReminder);
};

const updateReminder = async (req, res) => {
  const id = req.params.id;
  const updatedStatus = req.body.status;
  const updatedReminder = await reminderModel.updateReminder(id, updatedStatus);
  res.json(updatedReminder);
};

const deleteReminder = async (req, res) => {
  const id = req.params.id;
  const deletedReminder = await reminderModel.deleteReminder(id);
  res.json(deletedReminder);
};

module.exports = {
  getAllReminders,
  addReminder,
  updateReminder,
  deleteReminder,
};
