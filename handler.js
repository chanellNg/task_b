 // handler.js
'use strict';
 require('dotenv').config({ path: './variables.env' });
 const connectToDatabase = require('./db');
 const Quote = require('./quoteModel.js');

 module.exports.create = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.create(JSON.parse(event.body))
       .then(quote =>
         callback(null, {
           statusCode: 200,
           body: JSON.stringify(quote)
         })
       )
       .catch(err =>
         callback(null, {
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'error: Unable to save quote'
         })
       );
   });
 };
 module.exports.getOne = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.findById(event.pathParameters.id)
       .then(quote =>
         callback(null, {
           statusCode: 200,
           body: JSON.stringify(quote)
         })
       )
       .catch(err =>
         callback(null, {
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'error: Unable to view quote'
         })
       );
   });
 };
 module.exports.getAll = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.find()
       .then(quote =>
         callback(null, {
           statusCode: 200,
           body: JSON.stringify(quote)
         })
       )
       .catch(err =>
         callback(null, {
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'error: Unable to get quotes'
         })
       );
   });
 };
 module.exports.update = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.findByIdAndUpdate(
       event.pathParameters.id,
       JSON.parse(event.body),
       {
         new: true
       }
     )
       .then(quote =>
         callback(null, {
           statusCode: 200,
           body: JSON.stringify(quote)
         })
       )
       .catch(err =>
         callback(null, {
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'error: Unable to update quote'
         })
       );
   });
 };
 module.exports.delete = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.findByIdAndRemove(event.pathParameters.id)
       .then(quote =>
         callback(null, {
           statusCode: 200,
           body: JSON.stringify({
             message: 'Removed quote with id: ' + quote._id,
             quote: quote
           })
         })
       )
       .catch(err =>
         callback(null, {
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'Unable to delete quote!'
         })
       );
   });
 };