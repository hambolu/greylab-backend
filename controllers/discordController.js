const passport = require('passport');
const User = require('../models/user.model'); // Import your User schema
const uuid = require('uuid'); // Import uuid for generating unique IDs
const config = require('../config/config');
const discordConfig = config.discordConfig;


exports.authenticateDiscord = passport.authenticate('discord', discordConfig);

exports.discordCallback = (req, res) => {
  passport.authenticate('discord', async (err, profile) => {
    if (err) {
      // Handle error
      return res.redirect('/login');
    }

    if (!profile) {
      // Handle authentication failure
      return res.redirect('/login');
    }

    // Check if the user has also authenticated with Twitter
    if (req.session.twitterProfile) {
      // Redirect to wallet connection step
      return res.redirect('/connect-wallet');
    } else {
      // Store the Discord profile data in the session
      req.session.discordProfile = profile;
      // Redirect to the Twitter authentication route
      return res.redirect('/auth/twitter');
    }
  })(req, res);
};
