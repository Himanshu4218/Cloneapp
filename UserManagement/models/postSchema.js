const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image: String,
    text: String
})

module.exports = mongoose.model("post",postSchema);