// handler.js
'use strict';
 require('dotenv').config({ path: './variables.env' });
 const connectToDatabase = require('./db');
 const Quote = require('./quoteModel.js');

exports.create = (req, res) => {
   res.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.create((req.body))
       .then(quote =>
        res.json({
           statusCode: 200,
           body: JSON.stringify(quote)
         })
       )
       .catch(err =>
         res.json({
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'Could not create the item.'
         })
       );
   });
 };
exports.getOne = (req, res) => {
    res.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.findById(req.params.quote_id)
       .then(quote =>
        res.json({
           statusCode: 200,
           body: JSON.stringify(quote)
         })
       )
       .catch(err =>
        res.json({
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'Could not fetch the item.'
         })
       );
   });
 };
exports.getAll = (req, res) => {
    res.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.find()
       .then(quote =>
        res.json({
           statusCode: 200,
           body: JSON.stringify(quote)
         })
       )
       .catch(err =>
        res.json({
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'Could not fetch the items.'
         })
       );
   });
 };
 exports.update = (req, res) => {
    res.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.findByIdAndUpdate(
        req.params.quote_id,
        req.body,
       {
         new: true
       }
     )
       .then(quote =>
        res.json({
           statusCode: 200,
           body: JSON.stringify(quote)
         })
       )
       .catch(err =>
        res.json({
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'Could not update the items.'
         })
       );
   });
 };
exports.delete = (req, res) => {
    res.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.findByIdAndRemove(req.params.quote_id)
       .then(quote =>
        res.json({
           statusCode: 200,
           body: JSON.stringify({
             message: 'Removed note with id: ' + quote._id,
             quote: quote
           })
         })
       )
       .catch(err =>
        res.json({
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'Could not delete the item.'
         })
       );
   });
 };