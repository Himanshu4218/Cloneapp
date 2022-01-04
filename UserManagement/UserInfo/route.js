const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require("../models/postSchema");
const Comment = require('../models/comment')
const {verify} = require('../middleware/auth');

router.get('/post',verify,(req,res) => {
    console.log(req.user);
    Post.find()
    .exec((err,posts) => {
        if(err){
            return res.status(401).send({
                error: err
            })
        }
        else{
            res.status(200).send({
                posts: posts
            })
        }
    })
})
router.post('/post',verify,(req,res) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId,
        image: req.body.image,
        text: req.body.text
    })
    post.save()
    .then(result => {
        res.status(200).send({
            new_post: result
        })
        console.log(result);
    })
    .catch(err => {
        res.status(500).send({
            error: err
        })
    })
})

router.put('/post/:id',verify,(req,res) => {
    Post.findByIdAndUpdate(req.params.id,{image: req.body.image, text: req.body.text},(err,result) => {
        if(err){
            return res.status(401).send({
                error: err
            })
        }
        else{
            res.status(200).send({
                updated_post: result
            })
        }
    })
})

router.delete('/post/:id',verify,(req,res) => {
    Post.findByIdAndDelete(req.params.id,(err,result) => {
        if(err){
            return res.status(401).send({
                error: err
            })
        }
        else{
            res.status(200).send("post deleted")
        }
    })
})

module.exports = router;