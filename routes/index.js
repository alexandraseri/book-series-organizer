var express = require('express');
var router = express();

var Book = require('../models/book');
var Series = require('../models/series');


router.get('/', function(req, res){
    res.render('index', {})
});

router.get('/addSeries', function(req, res){
    res.render('addSeries', {})
});

router.get('/getSeriesList', function(req, res){
    Series.getSeriesList(function(error, list){
        if(error){
            console.log(error);
            return res.send({errors: [error]});
        } else {
            return res.send({data: list});
        }
    });
});

router.get('/getBooksList/:series_id', function(req, res){
    var seriesId = req.params.series_id;
    Series.getBooksListForSeries(seriesId, function(error, list){
        if(error){
            console.log(error);
            return res.send({errors: [error]});
        } else {
            return res.send({data: list});
        }
    });
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
    var id = req.body.id;
    var book = {
        series: req.body.series,
        name: req.body.name,
        pages: req.body.pages,
        stars: req.body.stars,
        published: req.body.published,
        finished: req.body.finished
    };

    req.checkBody('id', 'Book\'s id is required').notEmpty();
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
        Book.updateBook(id, book, function(error){
            if(error){
                console.log(error);
                return res.send({errors: [error]});
            } else {
                return res.sendStatus(200);
            }
        })
    }
});

router.post('/book/remove', function(req, res){
    var id = req.body.id;
    Book.removeBook(id, function(error){
        if(error){
            console.log(error);
            return res.send({errors: [error]});
        } else {
            return res.sendStatus(200);
        }
    });
});

router.post('/series/save', function(req, res){
    var series = {
        name: req.body.name
    };

    req.checkBody('name', 'Series\'s name is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log(errors);
        return res.send({errors: errors});
    } else {
        Series.saveSeries(series, function(error){
            if(error){
                console.log(error);
                return res.send({errors: [error]});
            } else {
                return res.sendStatus(200);
            }
        })
    }
});

router.post('/series/update', function(req, res){
    var id = req.body.id;
    var series = {
        name: req.body.name
    };

    req.checkBody('id', 'Series\'s id is required').notEmpty();
    req.checkBody('name', 'Series\'s name is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        console.log(errors);
        return res.send({errors: errors});
    } else {
        Series.updateSeries(id, series, function(error){
            if(error){
                console.log(error);
                return res.send({errors: [error]});
            } else {
                return res.sendStatus(200);
            }
        })
    }
});

router.post('/series/removeBook', function(req, res){
    var bookId = req.body.bookId;
    var seriesId = req.body.seriesId;
    Series.removeBook(seriesId, bookId, function(error){
        if(error){
            console.log(error);
            return res.send({errors: [error]});
        } else {
            return res.sendStatus(200);
        }
    });
});

router.post('/series/remove', function(req, res){
    var id = req.body.id;
    Series.removeSeries(id, function(error){
        if(error){
            console.log(error);
            return res.send({errors: [error]});
        } else {
            return res.sendStatus(200);
        }
    });
});

module.exports = router;