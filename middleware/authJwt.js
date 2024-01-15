const { decode, verify } = require('./securifyToken');
const { User, Role } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const decoded = decode(token, process.env.SECRET_KEY);

    // Verify token authenticity
    if (!verify(decoded)) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' }); // Consistent error message
  }
};

const checkRole = async (roleName, req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userRole = await Role.findById(user.roles);

    if (userRole.name === roleName) {
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(403).json({ message: `Unauthorized for ${roleName}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' }); // Informative error message
  }
};

// Export individual role-checking functions for flexibility
module.exports = {
  authenticateToken,
  checkAdmin: checkRole.bind(null, 'admin'),
  checkModerator: checkRole.bind(null, 'moderator'),
  checkContributor: checkRole.bind(null, 'contributor'),
  checkWriter: checkRole.bind(null, 'writer'),
  checkUser: checkRole.bind(null, 'user'),
};
