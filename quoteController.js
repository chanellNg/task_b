 // Import quote model
Quote = require('./quoteModel');

// Handle index quote actions
exports.getAll = function (req, res) {
    Quote.get(function (err, content) {
        if (err) {
            res.json({
                status: err,
                message: "error: Unable to get quotes",
            });
            return;
        }
        res.json({
            status: "success",
            message: "Quotes retrieved successfully",
            data: content
        });
    });
};

// Handle create quote actions
exports.create = function (req, res) {
    var quote = new Quote();
    quote.content = req.body.content ? req.body.content : quote.content;

// save the quote and check for errors
    quote.save(function (err) {
        if (err) {
            res.json({
                status: err,
                message: "error: Unable to save quote",
            });
            return;
        }
        res.json({
            message: 'New quote saved!',
            data: quote
        });
    });
};

// Handle view quote message
exports.getOne = function (req, res) {
    Quote.findById(req.params.quote_id, function (err, quote) {
        if (err) {
            res.json({
                status: err,
                message: "error: Unable to view quote",
            });
            return;
        }
        res.json({
            message: 'Finding your quote!',
            data: quote
        });
    });
};
// Handle update quote message
exports.update = function (req, res) {
Quote.findById(req.params.quote_id, function (err, quote) {
    if (err) {
        res.json({
            status: err,
            message: "error: Unable to find quote",
        });
        return;
    }
    quote.content = req.body.content ? req.body.content : quote.content;
    
// update the quote and check for errors
        quote.save(function (err) {
            if (err) {
                res.json({
                    status: err,
                    message: "error: Unable to update quote",
                });
                return;
            }
            res.json({
                message: 'Quote updated!',
                data: quote
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Quote.remove({
        _id: req.params.quote_id
    }, function (err, quote) {
        if (err) {
            res.json({
                status: err,
                message: "Unable to delete quote!",
            });
            return;
        }
        res.json({
            status: "success",
            message: 'Quote deleted!',
        });
    });
};