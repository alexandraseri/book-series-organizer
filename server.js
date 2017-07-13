var express = require("express");
var mongoose = require('mongoose');

var index = require('./routes/index');

mongoose.connect('mongodb://localhost:27017');
var server = express();

server.set('view engine', 'jade');
server.use(express.static(__dirname + '/public'));
server.use('/scripts', express.static(__dirname + '/bower_components'));


server.use('/', index);

server.listen(3000, function(){
    console.log("Server started.");
});