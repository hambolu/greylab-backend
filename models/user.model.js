const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

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
        ref: "Role"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    

});


module.exports = mongoose.model('Users', UserSchema);