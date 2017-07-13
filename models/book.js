var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var bookSchema = mongoose.Schema({
    name: String,
    pages: Number,
    starts: Number,
    published: Boolean,
    finished: Boolean
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;