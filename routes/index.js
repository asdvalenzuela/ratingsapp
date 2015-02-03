var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ratingslist', function(req, res) {
    var db = req.db;
    var collection = db.get('Rating');
    collection.find({},{},function(e,docs){
        res.render('ratingslist', {
            "ratingslist" : docs
        });
    });
});

router.get('/newrating', function(req, res) {
    res.render('newrating', { title: 'Add New Rating' });
});

router.post('/addrating', function(req, res) {
    var db = req.db;

    var restaurantName = req.body.restaurantName;
    var rating = req.body.rating;

    var collection = db.get('Rating');

    collection.insert({
        "restaurant_name" : restaurantName,
        "rating" : rating
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("ratingslist");
            // And forward to success page
            res.redirect("ratingslist");
        }
    });
});

module.exports = router;




