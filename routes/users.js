var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/ratingslist', function(req, res) {
	var db = req.db;
	db.collection('Rating').find().toArray(function(err,items) {
		res.json(items);
	});
});

router.post('/addrating', function(req, res) {
    var db = req.db;
    db.collection('Rating').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.delete('/deleterating/:id', function(req, res) {
    var db = req.db;
    var ratingToDelete = req.params.id;
    db.collection('Rating').removeById(ratingToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
