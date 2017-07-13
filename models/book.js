var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    name: String,
    pages: Number,
    stars: Number,
    published: Boolean,
    finished: Boolean
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;