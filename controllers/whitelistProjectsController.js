const db = require("../models");
const User = db.User;
const Project = db.Project;

exports.project = async (req, res, next) => {
  try {
    // Validate request data
    const requiredFields = ['name', 'description', 'webUrl', 'mintPrice', 'totalSupply', 'mintDate', 'wlSpots', 'user'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required.` });
      }
    }

    // Create a new project
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      webUrl: req.body.webUrl,
      twitterUrl: req.body.twitterUrl || null,
      discordUrl: req.body.discordUrl || null,
      network: req.body.network || null,
      mintPrice: req.body.mintPrice,
      totalSupply: req.body.totalSupply,
      mintDate: req.body.mintDate,
      wlSpots: req.body.wlSpots,
      user: req.body.user,
    });

    // Save the project to the database
    await project.save();

    // Return a success response
    res.status(201).json({ message: 'Project created successfully', data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.allProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    return res.json(allProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
