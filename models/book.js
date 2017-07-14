var mongoose = require('mongoose');

var Series = require('./series');

var bookSchema = mongoose.Schema({
    series: {type: mongoose.Schema.Types.ObjectId, ref: 'Serie'},
    name: String,
    pages: Number,
    stars: Number,
    published: Boolean,
    finished: Boolean
});

var Book = mongoose.model('Book', bookSchema);

Book.saveBook = function(properties, callback){
    var book = new Book(properties);
    book.save(function(error){
        if(error){
            callback(error, null);
        } else{
            Book.findOne(properties, function(error, savedBook){
                if(error){
                    callback(error, null);
                } else {
                    Series.addBook(properties.series, savedBook._id, function (error, series) {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, savedBook);
                        }
                    });
                }
            });
        }
    });
};

Book.updateBook = function(id, properties, callback){
    var query = {_id: id};
    Book.findOne(query, function(error, book){
        if(error){
            callback(error, null);
        } else {
            book.update(properties, function(error){
                if(error){
                    callback(error, null);
                } else {
                    Book.findOne(query, callback)
                }
            });
        }
    });
};

Book.removeBook = function(bookId, callback){
    var query = {_id: bookId};
    Book._findOneAndRemove(query, callback);
};

module.exports = Book;