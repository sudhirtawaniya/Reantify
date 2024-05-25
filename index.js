const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
const dbConfig = require('./config/db');
const authRoutes = require('./routes/auth');
const Property = require('./routes/property');
const path = require('path');
const app = express();
const port = 5000;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// Use the cors middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './frontend/build')));

app.use('/api/auth', authRoutes);
app.use('/api/property', Property);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
