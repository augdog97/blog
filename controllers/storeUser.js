
var express = require('express');
var storeUserP = express.Router();
const path = require('path');


/* Importing Database Model */
const User = require('../models/User.js');


/* 
creating the user and storing it into the database
if there is an error (try to register using a username that already is in use) then the user will be redirected to the register page
if there is no error then the process will compelte and the user will be redirected to the home page
*/ 
storeUserP.post('/users/register', (req,res) => {
    User.create(req.body, (error,user) => {
        if(error) {
        const validationErrors =  Object.keys(error.errors).map(key => error.errors[key].message);
        /** setting the request flash to to the validation errors key */
       req.flash('validationErrors', validationErrors)
       req.flash('data', req.body) /**storing the req.body in the body key of flash */ 
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
})

module.exports = storeUserP;