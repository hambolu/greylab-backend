const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
  },
  twitterProfile: {
    type: Object,
  },
  discordProfile: {
    type: Object,
  },
  venomAddress: {
    type: String,
    required: true,
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
