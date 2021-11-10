// Import quote model
Quote = require('./quoteModel');

// Handle index quote actions
exports.index = function (req, res) {
    Quote.get(function (err, content) {
        if (err) {
            res.status(404).json({
                status: err,
                message: "error: Unable to get quotes",
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Quotes retrieved successfully",
            data: content
        });
    });
};

// Handle create quote actions
exports.new = function (req, res) {
    var quote = new Quote();
    try {
        quote.content = req.body.content ? req.body.content : quote.content;
    }catch(err) {
        res.json({
            status: err,
            message: "error: Please enter content",
        });
    }

// save the quote and check for errors
    quote.save(function (err) {
        if (err) {
            res.status(403).json({
                status: err,
                message: "error: Unable to save quote",
            });
            return;
        }
        res.status(200).json({
            message: 'New quote saved!',
            data: quote,
            status:200
        });
    });
};

// Handle view quote message
exports.view = function (req, res) {
    Quote.findById(req.params.quote_id, function (err, quote) {
        if (err) {
            res.status(404).json({
                status: err,
                message: "error: Unable to view quote",
            });
            return;
        }
        res.status(200).json({
            message: 'Finding your quote!',
            data: quote,
            status:200
        });
    });
};
// Handle update quote message
exports.update = function (req, res) {
Quote.findById(req.params.quote_id, function (err, quote) {
    if (err) {
        res.status(403).json({
            status: err,
            message: "error: Unable to find quote",
        });
        return;
    }
    
    
    try {
        quote.content = req.body.content ? req.body.content : quote.content;
    }catch(err) {
        res.status(404).json({
            status: 404,
            message: "error: Please enter content",
        });
    }
    
// update the quote and check for errors
        quote.save(function (err) {
            if (err) {
                res.status(403).json({
                    status: err,
                    message: "error: Unable to update quote",
                });
                return;
            }
            res.status(200).json({
                message: 'Quote updated!',
                data: quote,
                status:200
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
            res.status(403).json({
                status: err,
                message: "Unable to delete quote!",
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: 'Quote deleted!'
        });
    });
};