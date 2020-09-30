
var express = require('express');
const bcrypt = require('bcrypt'); 
const User = require('../models/User.js');
const loginUser = express.Router();



/* 
1. We find the username that was entered to the username in the database
2/ if the user is true then compare the entered password to the password in the database, if they are the same then redirect to the user page, if not then redirect back to the login page
3. Else redirect back to the login page. 
*/ 
loginUser.post('/users/login', (req,res) => {
    /* Extracting the username and password from the request body  */
    const { username, password } = req.body;
    /* Finding the corresponding username in the database from what was entered */
    User.findOne({username: username}, (error,user) => { 
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    /* assinging the userid to the session. Server will send cooking back to server with the authenticated id. This is how we know if a user is logged in*/
                    req.session.userid = user._id;
                    res.redirect('/')
                } else {
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            res.redirect('/auth/login')
        }
    })
});

module.exports = loginUser; 





        