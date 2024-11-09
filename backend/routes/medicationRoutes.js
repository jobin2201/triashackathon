const express = require('express');
const db = require('../config/db'); // Import the database configuration
const router = express.Router();

// Add a new medication to the final table
router.post('/', async (req, res) => {
  const {
    drug_name,
    form,
    strength,
    strength_unit,
    dosage,
    qualifier,
    start_date,
    duration,
    duration_unit,
    frequency,
    add_meds,
    remind_when,
    refill_reminder
  } = req.body;

  const query = `
    INSERT INTO final (
      drug_name, form, strength, strength_unit, dosage, qualifier,
      start_date, duration, duration_unit, frequency, add_meds,
      remind_when, refill_reminder
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;
  `;

  try {
    const result = await db.query(query, [
      drug_name, form, strength, strength_unit, dosage, qualifier,
      start_date, duration, duration_unit, frequency, add_meds,
      remind_when, refill_reminder
    ]);
    res.status(201).json(result.rows[0]); // Send back the created medication
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add medication' });
  }
});
// Get all medications from the final table
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM final;';
  try {
    const result = await db.query(query);
    res.status(200).json(result.rows); // Send back all medications
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch medications' });
  }
});

// Edit a medication in the final table
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    drug_name,
    form,
    strength,
    strength_unit,
    dosage,
    qualifier,
    start_date,
    duration,
    duration_unit,
    frequency,
    add_meds,
    remind_when,
    refill_reminder
  } = req.body;

  const query = `
    UPDATE final
    SET 
      drug_name = $1, form = $2, strength = $3, strength_unit = $4,
      dosage = $5, qualifier = $6, start_date = $7, duration = $8,
      duration_unit = $9, frequency = $10, add_meds = $11, remind_when = $12, refill_reminder = $13
    WHERE id = $14 RETURNING *;
  `;
  try {
    const result = await db.query(query, [
      drug_name, form, strength, strength_unit, dosage, qualifier,
      start_date, duration, duration_unit, frequency, add_meds,
      remind_when, refill_reminder, id
    ]);
    res.status(200).json(result.rows[0]); // Send back the updated medication
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update medication' });
  }
});

// Delete a medication from the final table
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM final WHERE id = $1 RETURNING *;';
  try {
    const result = await db.query(query, [id]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: `Medication with ID ${id} deleted` });
    } else {
      res.status(404).json({ error: 'Medication not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete medication' });
  }
});

module.exports = router;
