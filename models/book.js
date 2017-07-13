var mongoose = require('mongoose');

var Series = require('./series');

var bookSchema = mongoose.Schema({
    series: ObjectId,
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

module.exports = Book;