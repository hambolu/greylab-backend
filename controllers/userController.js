
const db = require("../models");
const User = db.user;
const Role = db.role;


const dotenv = require("dotenv");
dotenv.config();

exports.allUsers = async (req, res) => {
  const allUsers = await User.find({}).populate({
    path: "roles",
    select: "name",
    model: Role,
  });
  return res.json(allUsers);
};

exports.getOneUser = async (req, res) => {

  const rolename = await Role.findOne({name:req.params.roleName});
  //return res.status(200).send(rolename);
  const oneUser = await User.find({ roles: rolename._id })
  .populate({path: "roles",select: "name",model: Role,});
  return res.status(200).send(oneUser);
};

exports.getSingleUser = async (req, res) => {
  const oneUser = await User.findOne({ _id: req.params.Id }).populate({
    path: "roles",
    select: "name",
    model: Role,
  })
  .populate({
    path: "package",
    model: Package,
  });
  return res.json(oneUser);
};

exports.updateProfile = (req, res, next) => {
  const Id = req.body.id;
  User.findByIdAndUpdate(Id, {
    $set: {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      address: req.body.address,
      phone_number: req.body.phone,
      website: req.body.website,
      interest: req.body.interest,
      level: req.body.level,
      recent_work: req.body.recent_work,
      bio: req.body.bio,
      city: req.body.city,
      location: req.body.location
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: "Error",
        data: error,
      });
    });
};

exports.updateProfileImage = async (req, res, next) => {
  const Id = req.body.id;
  await User.findByIdAndUpdate(Id, {
    $set: {
      image: req.file.filename
    },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({
        message: "Error",
        data: error,
      });
    });
};

exports.allRoles = async (req, res) => {
  const allRoles = await Role.find();
  return res.json(allRoles);
};

exports.delete = (req, res, next) => {
  User.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: "Deleted Successfuly",
      });
    })
    .catch((error) => {
      res.json({
        message: "Error",
        data: error,
      });
    });
};



