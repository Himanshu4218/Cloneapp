const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const User = require('../models/userSchema');

verify = (req,res,next) => {
    try{
        const token = req.cookies['access_token'];
        if(token){
            const verify = jwt.verify(token,process.env.jwt_key);
            if(verify){
                res.user = verify.id;
                next();
            }
            else{
                console.log("token expires");
            }
        }
    }
    catch(err){
        return res.status(401).send({
            error: err
        })
    }
}

verifyEmail = async (req,res,next) => {
    try{
        const user = await User.find({email: req.body.email})
        if(user.email_verified){
            next()
        }
        else{
            console.log("Please verify your email");
        }
    }
    catch(e){
        console.log(e);
        }
}

module.exports = { verify, verifyEmail};