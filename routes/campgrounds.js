var experss = require('express');
var router = experss.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

// INDEX
router.get('/', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// CREATE
router.post('/', middleware.isLoggedIn, (req, res) => {
  req.body.campground.author = {
    id: req.user._id,
    username: req.user.username
  };
  // create new campground and save to db
  Campground.create(req.body.campground, middleware.isLoggedIn, (err, createdCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err || !foundCampground) {
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// Edit campgrounds
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
      res.render('campgrounds/edit', {campground: foundCampground});
    }
  });
});

// UPDATE campground
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  // find and update correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
    if (err) {
      req.flash('error', 'Campground not found');
      res.redirect('back');
    } else {
        // redirect to show page
      res.redirect('/camgrounds' + req.params.id);
    }
  });
});
// Delete Campground
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdANdRemove(req.params.id, (err) => {
    if (err) {
      req.flash('error', 'Campground could not be deleted');
      res.redirect('/campgrounds');
    } else {
      req.flash('succes', 'Campground has been deleted');
      res.redirect("/campgrounds");
    }
  });
});


module.exports = router;
