const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const User = require('../models/userSchema');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const verifyEmail = require('../middleware/auth');

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLEINT_SECRET
  );

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const accessToken = oAuth2Client.getAccessToken();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'kashyaphimanshu389@gmai.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLEINT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
    },
    tls: {
        rejectUnauthorized: false
    }
    });
router.post('/signup',(req,res) => {
    bcrypt.hash(req.body.password,10, function(err, hash) {
        if(err){
            return res.status(401).send({
                error: err
            })
        }
        else{
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                email: req.body.email,
                email_verified: false,
                emailToken: crypto.randomBytes(64).toString('hex')
            })
            user.save()
            .then(result => {
                mail_options = {
                    from: 'Himanshu4218 <kashyaphimanshu398@gmail.com>',
                    to: email, 
                    subject: "mail test",
                    html: '<h4>Please verify your email</h4> <a href="https://${req.headers.host}/user/verify-email?token=${user.emailToken}">verify your email</a>',
                    text: msg 
                }

                transporter.sendMail(mail_options,(err,result) => {
                    if(err){
                        res.status(401).send(err);
                    }
                    else{
                        res.status(200).send(result);
                    }
                    transporter.close();
                });

                res.status(200).send({
                    new_user: result
                })
                console.log(result);
            })
            .catch(err => {
                res.status(500).send({
                    error: err
                })
            })
        }
    });
})
router.post('/login',verifyEmail,(req,res) => {
        User.find({username: req.body.username})                // returns array
        .exec((err,user) => {
            if(err){
                return res.status(401).send({
                    error: err
                })
            }

            if(user.length < 1){
                return res.status(401).send({
                    msg: "user not found"
                })
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result) => {
                if(err){
                    res.status(401).send({
                        msg: "wrong password"
                    })
                }
                else{
                    const token = jwt.sign({
                        username: user[0].username,
                        email:user[0].email
                    },
                    process.env.jwt_key,
                    {noTimestamp:true}
                    
                    )
                    res.cookie('access_token',token)
                    return res.status(200).send({
                        token: token,
                        username: user[0].username,
                        email: user[0].email
                    })
                }
            })
        })
})

router.get('/verify-email',async (req,res) => {
    try{
        const token = req.query.token;
        const user = await User.find({emailToken: token});
        if(user){
            user.emailToken= null,
            user.email_verified= true
            await user.save();
        }
        else{
            res.status(401).send("user not found");
        }
    }
    catch(e){
        res.status(401).send({
            error: e
        });
    }
})

router.get('/logout',(req,res) => {
    res.cookie('access_token',"",{ maxAge: 1 })
})

module.exports = router;