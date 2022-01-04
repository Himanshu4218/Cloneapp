const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emailToken: {
        type: String
    },
    email_verified: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("User",userSchema);