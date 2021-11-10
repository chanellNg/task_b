var mongoose = require('mongoose');
// Setup schema
var quoteSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});
// Export Quote model
var Quote = module.exports = mongoose.model('quote', quoteSchema);
module.exports.get = function (callback, limit) {
    Quote.find(callback).limit(limit);
}