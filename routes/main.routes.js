const express = require('express');
const cors = require('cors');
const config = require('../config/config');
//const path = require('path')
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))
    app.use(
      cors({
        origin: true,
        credentials: true,
        optionSuccessStatus: 200,
      })
      );
      const authController = require('../controllers/authController');
      const userControllers = require('../controllers/userController');
      const whitelistProjectController = require('../controllers/whitelistProjectsController');
      const authJwt = require('../middleware/authJwt');
      
      module.exports = function (app) {
        // Authentication
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
      
        // Roles
        app.get('/api/get-roles', [authJwt.authenticateToken], userControllers.allRoles);
      };      