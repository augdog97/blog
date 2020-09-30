

var express = require('express');
var newPost = express.Router();



newPost.get('/posts/new', (req, res) => {
    /* Checking to see if the session includes a userid and if it does go to the create page but if not go to the login page
    createpost will only exit and equal true when a user visits the route /posts/new*/
    if(req.session.userid) {
        return res.render('create', {
            createPost: true
        })
    }
    res.redirect('/auth/login')
});

module.exports = newPost;