const pool = require('../config/db');

const updateSettings = async (userId, settings) => {
  const { notification, timeZone } = settings;
  const query = `
    UPDATE settings SET notification=$1, time_zone=$2 WHERE user_id=$3 RETURNING *;
  `;
  const result = await pool.query(query, [notification, timeZone, userId]);
  return result.rows[0];
};

module.exports = {
  updateSettings,
};
