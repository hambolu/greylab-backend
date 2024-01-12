// config.js
require('dotenv').config({path: './.env'})
module.exports = {
    twitterConfig: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'https://greylabs.onrender.com/auth/twitter/callback', // Update with your callback URL
    },
    discordConfig: {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: 'https://greylabs.onrender.com//auth/discord/callback', // Update with your callback URL
    },
    // Other configurations if needed
    
      secret: process.env.TOKEN_KEY,

  };
  