const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');

require('dotenv').config({ path: './.env' });

const app = express();

// Configure CORS
app.use(
  cors({
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and handle errors properly
async function connectToMongo() {
  try {
    await mongoose.connect(process.env.DB_CONECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
    });
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('Connection error', err, process.env.DB_CONECTION);
    process.exit(1); // Exit with a non-zero status code to indicate failure
  }
}

connectToMongo().then(() => {
  // Import routes after connection is established
  const mainRoutes = require('./routes/main.routes');
  app.use('/', mainRoutes);

  // Root route handler
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to GreyLabs.' });
  });

  // Initialize database and roles after connection
  initial(); // Call initial() after connection is successful

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});

// Define initial() function
async function initial() {
  const Role = require('./models/role.model');
  const count = await Role.countDocuments();

  if (!count) {
    await Role.create({ name: 'developer' });
    await Role.create({ name: 'admin' });
    await Role.create({ name: 'user' });
  }
}
