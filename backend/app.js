const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const medicationRoutes = require('./routes/medicationRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();
const port = 5000;

// Enable CORS for the frontend running on http://localhost:4200
app.use(cors({
  origin: 'http://localhost:4200',  // Allow requests only from the frontend running on this URL
  methods: ['GET', 'POST'],        // Allow GET and POST methods
  allowedHeaders: ['Content-Type'] // Allow Content-Type header
}));

app.use(bodyParser.json()); // Middleware to parse JSON requests

// Use medication, reminder, and settings routes with /api prefix
app.use('/api/medications', medicationRoutes);  // Prefixed with /api/medications
app.use('/api/reminders', reminderRoutes);      // Prefixed with /api/reminders
app.use('/api/settings', settingsRoutes);        // Prefixed with /api/settings

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
