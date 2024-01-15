const express = require('express');
const { MongoClient } = require('mongodb'); // Import MongoClient from mongodb package
const cors = require('cors');
const config = require('./config/config');
require('dotenv').config();

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
    const client = await MongoClient.connect(process.env.DB_CONNECTION, {
      useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
      useNewUrlParser: true, // Use new url parser
      ssl: true,
      tls: true,
    });

    // Access the database using the client
    app.locals.db = client.db();
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('Connection error', err, process.env.DB_CONNECTION);
    process.exit(1); // Exit with a non-zero status code to indicate failure
  }
}


// Wrap the connection in an async IIFE to use await
(async () => {
  await connectToMongo();


  // Initialize database and roles after connection
  await initial(); // Call initial() after connection is successful

  // Start the server
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

//   const mainRoutes = require('./routes/main.routes');
// mainRoutes(app);

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to GreyLabs.' });
});


const authController = require('../controllers/authController');
      const userControllers = require('../controllers/userController');
      const whitelistProjectController = require('../controllers/whitelistProjectsController');
      const authJwt = require('../middleware/authJwt');


      app.post('/auth/login', authController.login);
        app.post('/auth/signup', authController.signup);
      
        // Project Route
        app.post('/createproject', [authJwt.verifyToken], whitelistProjectController.project);
        app.get('/allProject', [authJwt.verifyToken], whitelistProjectController.allProjects);
      
        // Users route
        app.post('/update-profile', [authJwt.verifyToken], userControllers.updateProfile);
        app.post('/update-profile-image', [authJwt.verifyToken], userControllers.updateProfileImage);
        app.get('/get-all-users', [authJwt.verifyToken], userControllers.allUsers);
        app.get('/getUserByRoleName/:roleName', userControllers.getOneUser);
        app.get('/getUser/:Id', [authJwt.verifyToken], userControllers.getSingleUser);
        app.delete('/delete-user/:id', [authJwt.verifyToken], userControllers.delete);
      
        // Roles
        app.get('/api/get-roles', [authJwt.verifyToken], userControllers.allRoles);
})();

// Define initial() function
async function initial() {
  const db = app.locals.db; // Access the database from app.locals

  const Role = db.collection('roles'); // Use the roles collection

  const count = await Role.countDocuments();

  if (!count) {
    await Role.insertMany([
      { name: 'developer' },
      { name: 'admin' },
      { name: 'user' },
    ]);
  }
}
