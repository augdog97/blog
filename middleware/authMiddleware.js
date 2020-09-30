

const User = require('../models/User');

/* Authentication Middleware*/

const authMiddleware = (req,res,next) => {
    User.findById(req.session.userid, (error,user) => {
        if(error || !user) {
            return res.redirect('/')
        }
            
        
            next()
    })
}

module.exports = authMiddleware;