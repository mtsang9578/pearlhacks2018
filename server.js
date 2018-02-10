var express = require ('express');
var app = express();
app.use(express.static("public"));

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


//CONFIG
var configDB = require('./config/database.js');


//MULTER THINGS
let multer = require ('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now()+file.mimetype.split('/')[0]);
    }
});


const upload = multer({storage: storage});

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'mtsang32',
    api_key: '489781664195457',
    api_secret: 'uo3KFpPvQPCGfavJrbafo9Sntzs'
});
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

//EXPRESS SETUP
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('view engine', 'ejs');


//PASSPORT AUTH SET UP
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port);
console.log("the app is listening on port " + port);