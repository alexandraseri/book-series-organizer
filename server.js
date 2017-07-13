var express = require("express");

var index = require('./routes/index');

var server = express();

server.use('/', index);

server.listen(3000, function(){
    console.log("Server started.");
});