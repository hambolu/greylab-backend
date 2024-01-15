const encode = require('../middleware/securifyToken');
const crypto = require('crypto');
const User = require('../models/user.model');
const config = require('../config/config');

const generateRandomString = async (length) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const randomString = buffer.toString('hex').slice(0, length);
        resolve(randomString);
      }
    });
  });
};

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      venomAddress: req.body.venomAddress,
    });

    if (existingUser) {
      return res.status(404).json({ message: 'User already exists' });
    }

    const maxLength = 10;
    const randomString = await generateRandomString(maxLength);

    const newUser = new User({
      login: `GLAB${randomString}`,
      venomAddress: req.body.venomAddress,
    });

    await newUser.save();

    const token = encode({ id: newUser.id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({
      message: 'Signup successful',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      venomAddress: req.body.venomAddress,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = encode({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      error,
    });
  }
};
