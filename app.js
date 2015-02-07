var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var ratings = require('./routes/ratings');

//database connection
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/ratingsdb', {native_parser:true});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

//makes db accessible to http requests (router)
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', ratings);

module.exports = app;
