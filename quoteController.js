'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Quote = require('./quoteModel');

module.exports.new = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		var quote = new Quote();
    try {
        quote.content = req.body.content ? req.body.content : quote.content;
    }catch(err) {
        res.status(404).json({
            message: "error: Please enter content",
        });
    }

    res.callbackWaitsForEmptyEventLoop = false;
   
    // save the quote and check for errors
        quote.save(function (err) {
            if (err) {
                res.status(403).json({
                    message: "error: Unable to save quote",
                });
                return;
            }
            res.status(200).json({
                message: 'New quote saved!',
                data: quote,
            });
        });
	});
};

module.exports.view = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		Quote.findById(req.params.quote_id, function (err, quote) {
            if (err) {
                res.status(404).json({
                    message: "error: Unable to view quote",
                });
                return;
            }
            res.status(200).json({
                message: 'Finding your quote!',
                data: quote,
            });
        });
	});
};

module.exports.index = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
        Quote.get(function (err, quotes) {
            if (err) {
                res.status(404).json({
                    message: "error: Unable to get quotes",
                });
                return;
            }
            res.status(200).json({
                message: "Quotes retrieved successfully",
                data: quotes
            });
        });
	});
};

module.exports.update = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		Quote.findById(req.params.quote_id, function (err, quote) {
            if (err) {
                res.status(403).json({
                    message: "error: Unable to find quote",
                });
                return;
            }
            
    
            try {
                quote.content = req.body.content ? req.body.content : quote.content;
            }catch(err) {
                res.status(404).json({
                    error: err,
                    message: "error: Please enter content",
                });
            }
        
    // update the quote and check for errors
            quote.save(function (err) {
                if (err) {
                    res.status(403).json({
                        message: "error: Unable to update quote",
                    });
                    return;
                }
                res.status(200).json({
                    message: 'Quote updated!',
                    data: quote,
                });
            });
        });
	});
};

module.exports.delete = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		Quote.remove({
            _id: req.params.quote_id
        }, function (err, quote) {
            if (err) {
                res.status(403).json({
                    message: "Unable to delete quote!",
                });
                return;
            }
            res.status(200).json({
                message: 'Quote deleted!'
            });
        });
	});
};