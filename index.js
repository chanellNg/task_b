// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');

// Initialise the app
let app = express();
const serverless = require('serverless-http');

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Do you want quotes?'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
if(!module.parent){
app.listen(port, function () {
    console.log("Running quote on port " + port);
});
}

module.exports = app;
