'use strict';
require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
// Import quote model
let Quote = require('./quoteModel');

// Handle index quote actions
module.exports.index = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase().then(() => {
        Quote.get(function (err, content) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
                return;
            }
            res.json({
                status: "success",
                message: "Quotes retrieved successfully",
                data: content
            });
        });
    });
};


// Handle create quote actions
module.exports.new = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase().then(() => {
        var quote = new Quote();
        quote.content = req.body.content ? req.body.content : quote.content;

        // save the quote and check for errors
        quote.save(function (err) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
                return;
            }
            res.json({
                message: 'New quote saved!',
                data: quote
            });
        });
    });
};

// Handle view quote message
module.exports.view = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase().then(() => {
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
    });
};
// Handle update quote message
module.exports.update = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase().then(() => {
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
    });
};
// Handle delete quote
module.exports.delete = function (req, res) {
    res.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase().then(() => {
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
                message: 'Quote deleted!'
            });
        });
    });
};