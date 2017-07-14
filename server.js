var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var index = require('./routes/index');

/******** Connect ********/
mongoose.connect('mongodb://localhost:27017/booksApp',{useMongoClient: true});

var server = express();


/******** CORS headers ********/
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/******** Static folder & files ********/
server.set('view engine', 'jade');
server.use(express.static(__dirname + '/public'));
server.use('/scripts', express.static(__dirname + '/bower_components'));

/******** Express Validator ********/
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(expressValidator([{
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}]));

/******** Routes ********/
server.use('/', index);


/******** Start Server ********/
server.listen(3000, function(){
    console.log("Server started.");
});