const passport = require('passport');
const User = require('../models/user.model'); // Import your User schema
const uuid = require('uuid'); // Import uuid for generating unique IDs
const config = require('../config/config');
const twitterConfig = config.twitterConfig;

exports.authenticateTwitter = passport.authenticate('twitter', twitterConfig);

exports.twitterCallback = (req, res) => {
  passport.authenticate('twitter', async (err, profile) => {
    if (err) {
      // Handle error
      return res.redirect('/login');
    }

    
    if (!profile) {
      // Handle authentication failure
      return res.redirect('/login');
    }

    // Check if the user has also authenticated with Discord
    if (req.session.discordProfile) {
      // Redirect to wallet connection step
      return res.redirect('/connect-wallet');
    } else {
      // Store the Twitter profile data in the session
      req.session.twitterProfile = profile;
      // Redirect to the Discord authentication route
      return res.redirect('/auth/discord');
    }
  })(req, res);
};
