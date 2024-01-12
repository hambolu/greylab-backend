
const db = require("../models");
const User = db.user;
const Project = db.project;

exports.project = async (req, res, next) => {
    try {
        
        // Create a new project
        const project = new Project({
          name: req.body.name,
          description: req.body.description,
          webUrl: req.body.webUrl,
          twitterUrl: req.body.twitterUrl,
          discordUrl:req.body.discordUrl,
          network:req.body.network,
          mintPrice: req.body.mintPrice,
          totalSupply:req.body.totalSupply,
          mintDate: req.body.mintDate,
          wlSpots: req.body.wlSpots,
          user: req.body.user,
        });
    
        // Save the user to the database
        await project.save();
    
        // Return a success response
        res.status(200).json({ message: 'Successful', data: project });
      } catch (error) {
        console.error(error, req.body.mintDate);
        res.status(500).json({ 
          message: 'Internal Server Error',
          error: error
        });
      }
  };

  exports.allProjects = async (req, res) => {
    const allProjects = await Project.find();
    return res.json(allProjects);
  };
  