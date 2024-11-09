const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medical',  // Replace with your database name
  password: 'jobin123', // Replace with your password
  port: 5432,
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database successfully!');
    const res = await client.query('SELECT NOW()');
    console.log(res.rows); // This will print the current time from the database
    client.release(); // Don't forget to release the client back to the pool
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

testConnection();
