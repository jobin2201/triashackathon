const express = require('express');
const bodyParser = require('body-parser');
const medicationRoutes = require('./routes/medicationRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

const app = express();
const port = 5000;

app.use(bodyParser.json()); // Middleware to parse JSON requests

// Use medication and reminder routes
app.use(medicationRoutes);
app.use(reminderRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
