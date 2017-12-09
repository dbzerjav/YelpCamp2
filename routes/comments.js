var experss = require('express');
var router = experss.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// Comments Routes
// Comments new
router.get('/new', middleware.isLoggedIn, (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      // send id through render
      res.render('comments/new', {campground: campground});
    }
  });
});
// comments create
router.post('/', middleware.isLoggedIn, (req, res) => {
  // look up campground using id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      req.flash('error', 'Campground not found');
      res.redirect('/campgrounds');
    } else {
      // create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash('error', 'Comment not found');
          res.redirect('back')
        } else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          // save comment
          comment.save();
          // connect comment to campground and save
          campground.comments.push(comment);
          campground.save();
          // redirect to campground show page
          req.flash('success', 'Successfully added comment');
          res.redirect('/campgrounds/' + campground._id);
        }
      })
    }
  });
});

// Edit Commments
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Camground.findById(req.params.id, (err, foundCampground) => {
    if (err || ! foundCampground){
      req.flash('error', 'Campground not found');
      res.redirect('back');
    }
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err || !foundComment) {
        req.flash('error', 'Comment not found')
        res.redirect('back');
      } else {
        res.render('comments/edit', {camground_id: req.params.id, comment: foundComment});
      }
    });
  });

});

// UPDATE Comments
router.put('/:comment_id/', middleware.checkCommentOwnership, (req, res) => {
  Commment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      req.flash('error', 'Comment could not be updated');
      res.redirect('back');
    } else {
      req.flash('success', 'Comment was successfully updated');
      res.redirect('/campgrounds/' + req.params.id );
    }
  });
});

// DELETE Comments
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdANdRemove(req.params.comment_id, (err) =>{
    if (err) {
      req.flash('error', 'Comment could not be deleted');
      res.redirect('back');
    } else {
      req.flash('Success', 'Comment was deleted');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});



module.exports = router;
