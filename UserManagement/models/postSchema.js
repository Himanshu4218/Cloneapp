const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image: String,
    text: String,
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
        },
        username: String
      },
    comments : [ 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
        }
        ]
})

module.exports = mongoose.model("post",postSchema);