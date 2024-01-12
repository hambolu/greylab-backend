
// Import the venom-connect package
const db = require("../models");
const User = db.user;
const Role = db.role;// Import your User schema
const uuid = require('uuid'); // Import uuid for generating unique IDs
const config = require('../config/config');
const VenomConnect = require('venom-connect');



exports.connectWallet = async (req, res) => {
  try {
    // Initialize Web3.js with your Ethereum node URL
    // Create a new VenomConnect instance
    const venomConnect = new VenomConnect({
        theme: "dark",
        checkNetworkId: 1000,
    });
  
  // Connect to the Venom wallet
  const connected = await venomConnect.connect();

    // Check if a wallet is connected
    if (connected) {
      // Fetch the user's  address
      const venomAddress = await venomConnect.getAddress();
      //const venomAddress = accounts[0];

      // Check if an address is obtained
      if (venomAddress) {
        // Get user details from the session
        const { twitterProfile, discordProfile } = req.session;

        // Generate a unique ID for the user
        const uniqueId = uuid.v4();

        //get role id
        const roleId = await Role.findOne({name:"user"});

        // Create a new user document in MongoDB with data from Twitter, Discord, and the wallet
        const newUser = new User({
          uniqueId: uniqueId,
          twitterProfile: twitterProfile,
          discordProfile: discordProfile,
          venomAddress: venomAddress,
          role: roleId.id 
        });

        // Save the user to MongoDB
        await newUser.save();
        
        // Redirect to a success page or perform other actions
        return res.redirect('/success');
      }
    }

    // Handle cases where no wallet is connected or no Ethereum address is available
    return res.redirect('/login');
  } catch (error) {
    // Handle any errors that occur during wallet connection
    return res.redirect('/login');
  }
};
