//old code

// Import quote model
'use strict';
require('dotenv').config({ path: './variables.env' });
Quote = require('./quoteModel');
const connectToDatabase = require('./db');

// Handle index quote actions
exports.index = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
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

// Handle create quote actions
exports.new = function (req, res) {
    var quote = new Quote();
    try {
        quote.content = req.body.content ? req.body.content : quote.content;
    }catch(err) {
        res.status(404).json({
            message: "error: Please enter content",
        });
    }

    res.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase().then(() => {
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

// Handle view quote message
exports.view = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
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
// Handle update quote message
exports.update = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
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
// Handle delete contact
exports.delete = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
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