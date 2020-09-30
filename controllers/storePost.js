var express = require('express');
var storePost = express.Router();
const path = require('path');


/* Importing Database Model */
const BlogPost = require('../models/BlogPost.js');




storePost.post('/posts/store', (req, res) => {
    /* Allowing image to be uploaded and posted in express and have it be added to the database */
    let image = req.files.image;
    /* Moves the images when uploaded to the img directory with the image name
        Blogpost.create, creates the blogpost and stores it in to the database with the
         image.
         setting the sessions userid to userid  */
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userid
        })
        res.redirect('/')
    })
})

module.exports = storePost;