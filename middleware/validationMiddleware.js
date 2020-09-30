

/* Validation Middleware to use for creating new blog post*/
const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null || req.body.body === null) {
        return res.redirect('/posts/new')
    }
    next();
}

module.exports = validateMiddleWare;