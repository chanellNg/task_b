// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');

// Initialise the app
let app = express();
const serverless = require('serverless-http');

// Import routes
let apiRoutes = require("./api-routes");
// Initialize express router
let router = require('express').Router();
var quoteController = require('./quoteController');
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
const apiRouter = router;
app.use('/api', apiRouter);

const quoteRouter = router;
apiRouter.use('/quotes', quoteRouter);

quoteRouter.get('/', quoteController.index)
quoteRouter.post('/', quoteController.new);
quoteRouter.get(':quote_id',quoteController.view)
quoteRouter.patch(':quote_id',quoteController.update)
quoteRouter.put(':quote_id',quoteController.update)
quoteRouter.delete(':quote_id',quoteController.delete);
// Launch app to listen to specified port
if(!module.parent){
app.listen(port, function () {
    console.log("Running quote on port " + port);
});
}

module.exports = app;
