





var express = require('express');
var newUser = express.Router();

/*
* setting username and password to blank strings so form doesnt throw an error saying value is null or undefined
 * accessing the first element in the data array and setting that to a variable of data
 * if the type of data is not equal to undefined then set username and password to what was entered in the forms fields.  
 */ 
newUser.get('/auth/register', (req,res) => {
    var username = "";
    var password = "";
    const data = req.flash('data')[0];
    if (typeof data != "undefined") {
        username = data.username
        password = data.password
    }
    res.render('register', {
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    })
})  

module.exports = newUser;



