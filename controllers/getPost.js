var express = require('express');
var getPost = express.Router();

/* Importing Database Model */
const BlogPost = require('../models/BlogPost.js');




getPost.get('/post/:id', async (req, res) => {
    /* When blog post on home page is clicked it renders that blogpost by finding it by the id.*/
    const blogpostid = await (await BlogPost.findById(req.params.id)).populate('usereid');
    res.render('post', {
        blogpostid
    });
});

module.exports = getPost;