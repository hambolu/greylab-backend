const express = require('express');
const cors = require('cors');
const config = require('../config/config');
//const path = require('path')
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))

const oneDay = 1000 * 60 * 60 * 24;
// app.use(
  //   sessions({
    //     secret: process.env.SESSION_KEY,
    //     saveUninitialized: true,
    //     cookie: { maxAge: oneDay },
    //     resave: false,
    //   })
    // );
    
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

module.exports = function(app) {
  
  // // Twitter authentication routes
  // app.get('/auth/twitter', twitterController.authenticateTwitter);
  // app.get('/auth/twitter/callback', twitterController.twitterCallback);
  
  // // Discord authentication routes
  // app.get('/auth/discord', discordController.authenticateDiscord);
  // app.get('/auth/discord/callback', discordController.discordCallback);
  
  // // Wallet connection route
  // app.get('/connect-wallet', venomController.connectWallet);
  
  // Authentication
  app.post('/auth/login', authController.login);
  app.post('/auth/signup', authController.signup);
// Project Route
app.post("/createproject", [authJwt.verifyToken], whitelistProjectController.project);
app.get("/allProject", [authJwt.verifyToken], whitelistProjectController.allProjects);


// users route
app.post("/update-profile", [authJwt.verifyToken], userControllers.updateProfile)
  app.post("/update-profile-image", [authJwt.verifyToken], userControllers.updateProfileImage)
  //app.post("/uploadCv", _userprofile.single('file'), [authJwt.verifyToken], userControllers.uploadCv)
  app.get("/get-all-users", [authJwt.verifyToken],  userControllers.allUsers);
  app.get("/getUserByRoleName/:roleName",  userControllers.getOneUser);
  app.get("/getUser/:Id", [authJwt.verifyToken], userControllers.getSingleUser);
  app.delete("/delete-user/:id", [authJwt.verifyToken], userControllers.delete)
  //roles
  app.get("/api/get-roles", [authJwt.verifyToken], userControllers.allRoles);

}