var express = require('express');
var router = express();

var Book = require('../models/book');


router.get('/', function(req, res){
    res.render('index', {})
});

router.get('/getSeriesList', function(req, res){

});

router.get('/getBooksList/:series_id', function(req, res){
    var seriesId = req.params.series_id;
});

router.post('/book/save', function(req, res){
   var book = {
       series: req.body.series,
       name: req.body.name,
       pages: req.body.pages,
       stars: req.body.stars,
       published: req.body.published,
       finished: req.body.finished
   };

   req.checkBody('series', 'Book\'s series is required').notEmpty();
   req.checkBody('name', 'Book\'s name is required').notEmpty();
   req.checkBody('pages', 'Book\'s number of pages is required').notEmpty().isInt();
   req.checkBody('stars', 'Book\'s stars rating is required').notEmpty().isFloat({min:0.0, max: 5.0});
   req.checkBody('published', 'Book\'s published status is required').notEmpty().isBoolean();
   req.checkBody('finished', 'Book\'s finished status is required').notEmpty().isBoolean();

   var errors = req.validationErrors();

   if(errors){
       console.log(errors);
       return res.send({errors: errors});
   } else {
        Book.saveBook(book, function(error){
            if(error){
                console.log(error);
                return res.send({errors: [error]});
            } else {
                return res.sendStatus(200);
            }
        })
   }
});

router.post('/book/update', function(req, res){

});

router.post('/series/save', function(req, res){

});

router.post('/series/update', function(req, res){

});

module.exports = router;