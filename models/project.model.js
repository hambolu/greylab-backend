const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
    },
    webUrl: {
        type: String,
        required: true,
    },
    discordUrl: {
        type: String,
        required: true,
    },
    twitterUrl: {
        type: String,
        required: true,
    },
    network: {
        type: String,
        required: true,
    },
    mintPrice: {
        type: String,
        required: true,
    },
    totalSupply: {
        type: String,
        required: true,
    },
    mintDate: {
        type: String,
        required: true,
    },
    wlSpots: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model('Projects', ProjectSchema);