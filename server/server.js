var express = require("express");
var app = express();
var bodyParser = require("body-parser");



// body-parser used for json in apis
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// set default path to html files
app.use(express.static("../public"));

// register apis
var activityApi = require('../server/api/activity-api')(app);
var commentApi = require('../server/api/comment-api')(app);
var userApi = require('../server/api/user-api')(app);

// create server
var server = app.listen(9999, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Fitman server started on " + port);
});


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Fitman', function (err) {
    if (err) {
        console.log('Error connecting to db');
        console.log(err);
    } 
});

module.exports = server;