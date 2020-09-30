

/* If the session userid is true (user is logged in) then redirect to the home page*/
const redirectIfAuthenticated = (req,res,next) => {
    if(req.session.userid) {
        return res.redirect('/');
    }
    next()
}

module.exports = redirectIfAuthenticated;