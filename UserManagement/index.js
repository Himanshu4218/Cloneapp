const express = require('express');
const mongoose = require('mongoose');
const User = require("./models/userSchema");
const Post = require("./models/postSchema");
const routesUrl1 = require('./routes/route')
const routesUrl2 = require('./UserInfo/route')

mongoose.connect("mongodb://localhost/userdb");

const app = express();
const port = 3000

app.use(express.json());
app.use('/auth',routesUrl1);
app.use('/user',routesUrl2)

app.get('*',(req,res) => {
    res.send("wrong url");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})