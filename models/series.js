var mongoose = requite('mongoose');

var seriesSchema = mongoose.Schema({
    name: String,
    books: [ObjectId],
    published: Boolean,
    totalPages: Number,
    avgScore: Number
});

var Series = mongoose.model('Serie', seriesSchema);

module.exports = Series;