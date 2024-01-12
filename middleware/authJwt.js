const encode = require('./securifyToken');
const decode = require('./securifyToken');
const verify = require('./securifyToken');
const db = require('../models');
const User = db.user;
const Role = db.role;

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    const decoded = securifyToken.decode(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const checkRole = (roleName) => async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];

    User.findOne({ _id: req.userId }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      const userRole = await Role.findOne({ _id: user.roles });

      if (userRole.name === roleName) {
        res.status(200).send({ message: 'Success' });
        return;
      } else {
        res.status(404).send({ message: `Unauthorized for None ${roleName}` });
        return;
      }
    });
  } catch (error) {
    res.status(500).send(error);
    return;
  }
};

const authJwt = {
  authenticateToken,
  isAdmin: checkRole('admin'),
  isModerator: checkRole('moderator'),
  isContributor: checkRole('contributor'),
  isWriter: checkRole('writer'),
  isUser: checkRole('user'),
};

module.exports = authJwt;
