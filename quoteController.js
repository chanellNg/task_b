// Import quote model
Quote = require('./quoteModel');
admin = require('./firebase')

// Handle index quote actions
exports.index = function (req, res) {
    console.log(req['headers']['authorization']);
    const user = req['currentUser'];
    console.log(user);
    if (user) {
        Quote.get(function (err, content) {
            if (err) {
                res.json({
                    status: err,
                    message: "error: Unable to get quotes",
                });
                return;
            }
            res.json({
                status: 200,
                message: "Quotes retrieved successfully",
                data: content
            });
        });
    } else {
        return res.json({
            status: 401,
            message: "error: Unable to get quotes as user is not authenticated",
        });
        return;
    }
};

exports.setRole = function (req, res) {
    console.log(req);
    console.log(req.body);
    admin.auth()
        .setCustomUserClaims(req.body.uid, {
            role: req.body.role,
          // YOU CAN ADD ANY FIRLDS IN THERE
        })
        .then(() => console.log('done'))
    return res.json({
        message: 'role updated!',
    });
};

// Handle create quote actions
exports.new = async function (req, res) {
    var quote = new Quote();
    var decodedToken;
    quote.content = req.body.content ? req.body.content : quote.content;
    const idToken = req['headers']['authorization'].split('Bearer ')[1];
    try {
        decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log("success");
    } catch (err) {
        console.log(err);
    }
    const uid = decodedToken.uid;
    console.log(uid);
    var role;
    admin.auth().getUser(uid).then((userRecord) => {
        // The claims can be accessed on the user record.
        role = userRecord.customClaims.role;
      });
// save the quote and check for errors
    quote.save(function (err) {
        if (err) {
            res.json({
                status: err,
                message: "error: Unable to save quote",
            });
            return;
        }
        if(role != "admin") {
            res.json({
                status: 403,
                message: "error: Unable to save quote as you are not an admin",
            });
            return;
        }
        res.json({
            status: 200,
            message: 'New quote saved!',
            data: quote
        });
    });
};


// Handle view quote message
exports.view = function (req, res) {
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
};
// Handle update quote message
exports.update = function (req, res) {
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
};
// Handle delete contact
exports.delete = function (req, res) {
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
};