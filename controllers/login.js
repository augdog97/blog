


var express = require('express');
var login = express.Router();

/*  
Render the Login Page
*/
login.get('/auth/login', (req, res) => {
    res.render('login')
})

module.exports = login;