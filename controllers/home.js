var express = require('express');
var home = express.Router();

/* Importing Database Model */
const BlogPost = require('../models/BlogPost.js');



home.get('/', async (req, res) => {
    /* created blog post variable to be used on homepage to dynamically render blog post information
    each post has a reference to the user (userid)
    .populate automatically references the specifid document in the user collection */
    const blogpost = await BlogPost.find({}).populate('userid');
    console.log(req.session)
    res.render('index', {
        blogpost
    });
});

module.exports = home;