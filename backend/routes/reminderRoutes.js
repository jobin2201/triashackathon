const express = require('express');
const reminderModel = require('../models/reminder'); // Assuming reminderModel is where database interactions are defined
const router = express.Router();

// Create a new reminder
router.post('/reminders', async (req, res) => {
  const { medication_id, reminder_time, status } = req.body;

  try {
    // Check if the medication_id exists in the medications table
    const medication = await reminderModel.checkMedicationExists(medication_id);

    if (!medication) {
      // If the medication does not exist, return a 400 error
      return res.status(400).json({ error: 'Medication ID does not exist' });
    }

    // If medication exists, insert the reminder into the reminders table
    const newReminder = await reminderModel.addReminder({ medication_id, reminder_time, status });
    res.status(201).json(newReminder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create reminder' });
  }
});

// Get all reminders
router.get('/reminders', async (req, res) => {
  try {
    const reminders = await reminderModel.getAllReminders();
    res.status(200).json(reminders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reminders' });
  }
});

// Mark a reminder as taken
router.put('/reminders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReminder = await reminderModel.updateReminder(id, 'taken');
    if (!updatedReminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.status(200).json(updatedReminder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update reminder status' });
  }
});

// Delete a reminder
router.delete('/reminders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReminder = await reminderModel.deleteReminder(id);
    if (!deletedReminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.status(200).json({ message: `Reminder with ID ${id} deleted` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete reminder' });
  }
});

module.exports = router;
