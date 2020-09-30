

var express = require('express');
var logout = express.Router();

/*  Destroys the session data including the user id and then redirects the user back to the home page*/
logout.get('/auth/logout', (req,res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = logout;
