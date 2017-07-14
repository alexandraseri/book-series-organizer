var mongoose = requite('mongoose');

var seriesSchema = mongoose.Schema({
    name: String,
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    published: Boolean,
    totalPages: Number,
    avgScore: Number
});

var Series = mongoose.model('Serie', seriesSchema);

Series.getBooksListForSeries = function(seriesId, callback){
    var query = {_id: seriesId};
    Series.findOne(query)
        .populate('books')
        .exec(function(error, series){
         if(error){
             callback(error, null);
         } else {
             callback(null, series.books);
         }
    });
};

Series.getSeriesList = function(callback){
    Series.find({})
        .populate('books')
        .exec(callback);
};

Series.addBook = function(seriesId, bookId, callback){
    var query = {_id: seriesId};
    Series.findOne(query, function(error, series){
        if(error){
            callback(error, null);
        } else {
            var books = series.books;
            books.push(bookId);
            series.update({books: books}, function(error){
                if(error){
                    callback(error, null);
                } else {
                    Series.findOne(query, callback);
                }
            });
        }
    });
};

Series.removeBook = function(seriesId, bookId, callback){
    var query = {_id: seriesId};
    Series.findOne(query, function(error, series){
        if(error){
            callback(error, null);
        } else {
            var books = series.books;
            var index = -1;
            for(var i = 0; i < books.length; i++){
                if(books[i] === bookId){
                    index = i;
                }
            }
            books.splice(index, 1);

            series.update({books: books}, function(error){
                if(error){
                    callback(error, null);
                } else {
                    Series.findOne(query, callback);
                }
            });
        }
    });
};

Series.saveSeries = function(properties, callback){
    var series = new Series(properties);
    series.save(function(error){
        if(error){
            callback(error, null);
        } else {
            Series.findOne(properties, callback);
        }
    });
};

Series.updateSeries = function(seriesId, properties, callback){
    var query = {_id: seriesId};
    Series.findOne(query, function(error, series){
        if(error){
            callback(error, null);
        } else {
            series.update(properties, function(error){
                if(error){
                    callback(error, null);
                } else {
                    Series.findOne(query, callback);
                }
            });
        }
    });
};

Series.removeSeries = function(seriesId, callback){
    var query = {_id: seriesId};
    Series.findOneAndRemove(query, callback);
};

module.exports = Series;