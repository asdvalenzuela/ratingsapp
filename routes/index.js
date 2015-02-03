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

module.exports = router;




