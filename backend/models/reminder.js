const db = require('../config/db'); // Assuming the database connection is handled in db.js

// Get all reminders from the reminders table
const getAllReminders = async () => {
  const result = await db.query('SELECT * FROM reminders');
  return result.rows;
};

// Add a new reminder to the reminders table
const addReminder = async (reminder) => {
  const { medication_id, reminder_time, status } = reminder;
  const query = `
    INSERT INTO reminders (medication_id, reminder_time, status)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const result = await db.query(query, [medication_id, reminder_time, status]);
  return result.rows[0]; // Return the newly added reminder
};

// Update reminder status in the reminders table
const updateReminder = async (id, updatedStatus) => {
  const query = 'UPDATE reminders SET status=$1 WHERE id=$2 RETURNING *;';
  const result = await db.query(query, [updatedStatus, id]);
  return result.rows[0]; // Return the updated reminder
};

// Delete a reminder from the reminders table
const deleteReminder = async (id) => {
  const query = 'DELETE FROM reminders WHERE id=$1 RETURNING *;';
  const result = await db.query(query, [id]);
  return result.rows[0]; // Return the deleted reminder
};

module.exports = {
  getAllReminders,
  addReminder,
  updateReminder,
  deleteReminder,
};
