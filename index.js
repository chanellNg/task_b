// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
let firebaseAdmin = require('./firebase');

const cors = require('cors');

app.use(cors({ origin: true }));


  
// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/quote', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

/*// Send message for default URL
app.get('/', (req, res) => res.send('Do you want quotes?'));
*/


async function decodeIDToken(req, res, next) {
    console.log('middleware');
    if(req['headers']['authorization']){
        if (req['headers']['authorization'].startsWith('Bearer ')) {
        const idToken = req['headers']['authorization'].split('Bearer ')[1];
            
        try {
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
            req['currentUser'] = decodedToken;
            console.log("success");
        } catch (err) {
            console.log(err);
        }
        }
    }
  
    next();
  }

app.use(decodeIDToken);

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port

if(!module.parent){
app.listen(port, function () {
    console.log("Running quote on port " + port);
});
}


module.exports = app;

