

/* Utilties used*/
const http = require('http');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

/* View Engine used */
const ejs = require('ejs');
app.set('view engine', 'ejs');


 /* Global Variables, will be abled to be accessed by all ejs files */

    global.loggedin = null; 

/* MONGOdb Database*/

    /* Data base creation notes 
    After intall mongdb via Brew and installing Mongoose via npm, We require mongoose and create a connection to the database. 
    2. we use Localhost because the database is being hosted on the local machine, blog is the name of the databse, if database doesnt exist mongdb will create one
    3. Copy and paste the url in '' in the connect url into Compass to get visual representation of database
    */

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://augdog97:Lemonade97989@blog-portfolio.9f5gv.mongodb.net/test', { useNewUrlParser: true })





/*   Middleware import*/
const validationMiddleware = require('./middleware/validationMiddleware');
const authenticationMiddleware = require('./middleware/authMiddleware');
const redirectifAuthenticatedMiddleware = require('./middleware/redirectifAuthenticated');

/* Middleware used in site*/
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validationMiddleware);
app.use(expressSession({
    secret: 'Keyboard cat'
}))
/*
 (*) means that on all requests the below will run
 we set loggedin to equal the sessons userid
 */
app.use("*", (req,res,next)=> {
    loggedin = req.session.userid
    next()
})
/**Allows data to only be viewd in the current session, but not when a new lifecycle starts (user refreshes page) */
app.use(flash());

/* Router Imports */
const homeRouter = require('./controllers/home');
const newPostRouter = require('./controllers/newPost');
const getPostRouter = require('./controllers/getPost');
const storePostRouter = require('./controllers/storePost');
const newUserRouter = require('./controllers/newuser');
const storeUserRouter = require('./controllers/storeUser');
const loginRouter = require('./controllers/login');
const loginUserRouter = require('./controllers/loginUser');
const loggedOutRouter = require('./controllers/logout');



/* GET routers*/
app.get('/', homeRouter);
app.get('/posts/new', authenticationMiddleware, newPostRouter);
app.get('/post/:id', getPostRouter);
app.post('/posts/store', authenticationMiddleware,storePostRouter);
app.get('/auth/register', redirectifAuthenticatedMiddleware,newUserRouter);
app.post('/users/register', redirectifAuthenticatedMiddleware,storeUserRouter);
app.get('/auth/login', redirectifAuthenticatedMiddleware,loginRouter);
app.post('/users/login', redirectifAuthenticatedMiddleware,loginUserRouter);
/** Does not serve any html simply just logs the user out and redirects to the home page */
app.get('/auth/logout', loggedOutRouter);
/** Express will go through all of the path routes and if it cant find a match it will render the not found page  */
app.use((req,res) => {
    res.render('notfound')
});



let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log("App Listening on port 3000")
});