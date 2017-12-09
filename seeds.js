var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [{
    name: "Granite Peak",
    image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
    description: "Lorem ipsum dolor sit amet, a varius et nibh mauris nunc dignissim, justo nibh mattis natoque congue euismod, libero nam dolor ut fringilla. Cursus nulla posuere urna eu, posuere libero est tellus, quis sed cras lectus id lorem turpis. Mus interdum suscipit felis, nec praesent proin sed maecenas, at sit purus nascetur convallis. Pretium venenatis sodales praesent ipsum, et eget nulla dolores integer et. Ut sed praesent urna arcu turpis, sodales pellentesque, nunc sit sapien sed at lacinia, rhoncus orci pretium tempor. Amet eu vel ultrices, duis ut elit erat turpis, risus cursus placerat dolor, et pede ultrices. Non pharetra libero amet egestas nisl semper."
  }, {
    name: "Mountain Side",
    image: "https://i.pinimg.com/236x/bb/2d/0e/bb2d0e03c77920799c53c1cec9ac2c61--yosemite-national-park-national-parks-usa.jpg",
    description: "Lorem ipsum dolor sit amet, a varius et nibh mauris nunc dignissim, justo nibh mattis natoque congue euismod, libero nam dolor ut fringilla. Cursus nulla posuere urna eu, posuere libero est tellus, quis sed cras lectus id lorem turpis. Mus interdum suscipit felis, nec praesent proin sed maecenas, at sit purus nascetur convallis. Pretium venenatis sodales praesent ipsum, et eget nulla dolores integer et. Ut sed praesent urna arcu turpis, sodales pellentesque, nunc sit sapien sed at lacinia, rhoncus orci pretium tempor. Amet eu vel ultrices, duis ut elit erat turpis, risus cursus placerat dolor, et pede ultrices. Non pharetra libero amet egestas nisl semper."
  }, {
    name: "Eagles Rest",
    image: "https://www.places.co.za/crs/photolarge/76894.jpg",
    description: "Lorem ipsum dolor sit amet, a varius et nibh mauris nunc dignissim, justo nibh mattis natoque congue euismod, libero nam dolor ut fringilla. Cursus nulla posuere urna eu, posuere libero est tellus, quis sed cras lectus id lorem turpis. Mus interdum suscipit felis, nec praesent proin sed maecenas, at sit purus nascetur convallis. Pretium venenatis sodales praesent ipsum, et eget nulla dolores integer et. Ut sed praesent urna arcu turpis, sodales pellentesque, nunc sit sapien sed at lacinia, rhoncus orci pretium tempor. Amet eu vel ultrices, duis ut elit erat turpis, risus cursus placerat dolor, et pede ultrices. Non pharetra libero amet egestas nisl semper."
  }];

function seedDB() {
  // remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Removed Campgrounds!');
      // Add campgrounds
      data.forEach((seed) => {
        Campground.create(seed, (err, campground) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Added a campground!');
            Comment.create({
              text: "This place is great",
              author: "Homer"
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Created new comment');
              }
            })
          }
        });
      });
    }
  });
}

module.exports = seedDB;
