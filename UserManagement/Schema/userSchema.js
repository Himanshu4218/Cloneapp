const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    // password: String,
    email: String,
    // email_verified: false 
})

module.exports = mongoose.model("User",userSchema);