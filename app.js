var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');

// requring routes
var commentRoutes = require('./routes/comments');
var campgroundRoutes = require('./routes/campgrounds');
var indexRoutes = require('./routes/index');

var port = 3000 || process.env.PORT;
var ip = '127.0.0.1' || process.env.IP;

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/yelp_camp', {useMongoClient: true});
mongoose.connect('mongodb://goob:719Hiddenlake@ds133746.mlab.com:33746/goobcamp2', {useMongoClient: true});
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +  '/public'));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();

// Passport Config
app.use(require('express-session')({
  secret: "i rowed upstream to find Lenore",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// serve currentUser to all Routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('error');
  next();
});

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


app.listen(port, ip, () =>{
  console.log(`The YelpCamp server is running on ${ip}:${port}`);
});
