const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const config = require('./config/config');
require('dotenv').config();

const app = express();

// Configure CORS
app.use(cors({
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
}));

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and handle errors properly
async function connectToMongo() {
  try {
    const client = await MongoClient.connect(process.env.DB_CONNECTION, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      ssl: true,
      tls: true,
    });

    // Access the database using the client
    app.locals.db = client.db();
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('Connection error', err, process.env.DB_CONNECTION);
    process.exit(1);
  }
}

// // Initialize database and roles after connection
async function initialize() {
  const db = app.locals.db;

  const Role = db.collection('roles');

  const count = await Role.countDocuments();

  if (!count) {
    await Role.insertMany([
      { name: 'developer' },
      { name: 'admin' },
      { name: 'user' },
    ]);
  }
}

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to GreyLabs.' });
});

// Route definitions
const authController = require('./controllers/authController');
const userControllers = require('./controllers/userController');
const whitelistProjectController = require('./controllers/whitelistProjectsController');
const authJwt = require('./middleware/authJwt');

app.post('/auth/login', authController.login);
app.post('/auth/signup', authController.signup);

// Project Route
app.post('/createproject', [authJwt.authenticateToken], whitelistProjectController.project);
app.get('/allProject', [authJwt.authenticateToken], whitelistProjectController.allProjects);

// Users route
app.post('/update-profile', [authJwt.authenticateToken], userControllers.updateProfile);
app.post('/update-profile-image', [authJwt.authenticateToken], userControllers.updateProfileImage);
app.get('/get-all-users', [authJwt.authenticateToken], userControllers.allUsers);
app.get('/getUserByRoleName/:roleName', userControllers.getOneUser);
app.get('/getUser/:Id', [authJwt.authenticateToken], userControllers.getSingleUser);
app.delete('/delete-user/:id', [authJwt.authenticateToken], userControllers.delete);

// Start the server
(async () => {
  await connectToMongo();
  await initialize();

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
})();
