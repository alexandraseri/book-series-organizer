var mongoose = requite('mongoose');

var seriesSchema = mongoose.Schema({
    name: String,
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    published: Boolean,
    totalPages: Number,
    avgScore: Number
});

var Series = mongoose.model('Serie', seriesSchema);

Series.addBook = function(seriesId, bookId, callback){

};

Series.saveSeries = function(properties, callback){

};

module.exports = Series;