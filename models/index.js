const mongoose = require('mongoose');
require('dotenv').config()
// No need for Promise configuration anymore

const db = {};

//Connect to MongoDB database
mongoose.connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    ssl: true,
    tls: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Import models directly and assign to db object
db.User = require('./user.model');
db.Role = require('./role.model');
db.Project = require('./project.model');

// Define ROLES directly without storing inside an object
db.ROLES = ['admin', 'developer', 'user'];

module.exports = db;