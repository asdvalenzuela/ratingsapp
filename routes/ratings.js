var express = require('express');
var router = express.Router();

router.get('/ratings', function(req, res) {
    var db = req.db;
    db.collection('Rating').find().toArray(function(err,items) {
        res.json(items);
    });
});

router.get('/ratings/:id', function(req, res) {
    var db = req.db;
    db.collection('Rating').findById(req.params.id, function(err, result) {
        res.json(result);
    });
});

router.post('/ratings', function(req, res) {
    var db = req.db;
    db.collection('Rating').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.put('/ratings/:id', function(req, res) {
    var db = req.db;
    db.collection('Rating').updateById(req.params.id, {'$set': {restaurant_name: req.body.restaurant_name, rating: req.body.rating}}, function(err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.delete('/ratings/:id', function(req, res) {
    var db = req.db;
    var ratingToDelete = req.params.id;
    db.collection('Rating').removeById(ratingToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
