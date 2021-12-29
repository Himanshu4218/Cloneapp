const express = require('express');
const mongoose = require('mongoose');
const User = require("./Schema/userSchema");

mongoose.connect("mongodb://localhost/userdb");

const app = express();
const port = 3000

run()
async function run(){
    const user = new User({username: "himanshu", email: "hhvg@gmail.com"})
    await user.save();
    console.log(user);
}

app.get('*',(req,res) => {
    res.send("HI");
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})