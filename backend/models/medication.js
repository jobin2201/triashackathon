const pool = require('../config/db');

// Get all medications from the final table
const getAllMedications = async () => {
  const result = await pool.query('SELECT * FROM final');
  return result.rows;
};

// Add a new medication to the final table
const addMedication = async (medication) => {
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
  } = medication;

  const query = `
    INSERT INTO final (
      drug_name, form, strength, strength_unit, dosage, qualifier,
      start_date, duration, duration_unit, frequency, add_meds,
      remind_when, refill_reminder
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;
  `;
  const result = await pool.query(query, [
    drug_name, form, strength, strength_unit, dosage, qualifier,
    start_date, duration, duration_unit, frequency, add_meds,
    remind_when, refill_reminder
  ]);
  return result.rows[0];
};

// Update medication in the final table
const updateMedication = async (id, updatedDetails) => {
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
  } = updatedDetails;

  const query = `
    UPDATE final
    SET 
      drug_name = $1, form = $2, strength = $3, strength_unit = $4,
      dosage = $5, qualifier = $6, start_date = $7, duration = $8,
      duration_unit = $9, frequency = $10, add_meds = $11, remind_when = $12, refill_reminder = $13
    WHERE id = $14
    RETURNING *;
  `;
  const result = await pool.query(query, [
    drug_name, form, strength, strength_unit, dosage, qualifier,
    start_date, duration, duration_unit, frequency, add_meds,
    remind_when, refill_reminder, id
  ]);
  return result.rows[0];
};

// Delete a medication from the final table
const deleteMedication = async (id) => {
  const query = `DELETE FROM final WHERE id = $1 RETURNING *;`;
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0]; // Return the deleted medication
  } catch (error) {
    console.error('Error deleting medication:', error);
    throw error;
  }
};

module.exports = {
  getAllMedications,
  addMedication,
  updateMedication,
  deleteMedication,
};
