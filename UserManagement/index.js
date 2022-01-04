const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const User = require("./models/userSchema");
const Post = require("./models/postSchema");
const cookieParser = require('cookie-parser');
const routesUrl1 = require('./routes/route')
const routesUrl2 = require('./UserInfo/route')
require('dotenv').config();

mongoose.connect("mongodb://localhost/userdb");

app.use(cookieParser());
app.use(express.json());
app.use('/auth',routesUrl1);
app.use('/user',routesUrl2)

app.get('*',(req,res) => {
    res.send("wrong url");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})