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
           body: 'Could not create the quote.'
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
           body: 'Could not fetch the quote.'
         })
       );
   });
 };

 module.exports.getAll = (event, context, callback) => {
   context.callbackWaitsForEmptyEventLoop = false;
   connectToDatabase().then(() => {
     Quote.find()
       .then(quotes =>
         callback(null, {
           statusCode: 200,
           body: JSON.stringify(quotes)
         })
       )
       .catch(err =>
         callback(null, {
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'Could not fetch the quotes.'
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
           body: 'Could not update the quote.'
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
             message: 'Removed note with id: ' + quote._id,
             quote: quote
           })
         })
       )
       .catch(err =>
         callback(null, {
           statusCode: err.statusCode || 500,
           headers: { 'Content-Type': 'text/plain' },
           body: 'Could not delete the quote.'
         })
       );
   });
 };