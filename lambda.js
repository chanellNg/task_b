import serverless from 'serverless-http';
// Import Mongoose
let mongoose = require('mongoose');
import app from './index.js';

const serverlessApp = serverless(app);


module.exports.handler = async (event, context) => {
  // Make sure we have a database connection
  // Connect to Mongoose and set connection variable
    mongoose.connect('mongodb://localhost/quote', { useNewUrlParser: true});
    var db = mongoose.connection;

    // Added check for DB connection
    if(!db)
        console.log("Error connecting db")
    else
        console.log("Db connected successfully")
    // Handle the event
    const result = await serverlessApp(event, context);

  return result;
};