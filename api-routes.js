// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to QUOTES!'
    });
});

// Import controller
var quoteController = require('./quoteController');
// Contact routes
/*
router.get('/quotes', quoteController.index);
router.post('/quotes',quoteController.new);
router.get('/quotes/:quote_id',quoteController.view)
router.patch('/quotes/:quote_id',quoteController.update)
router.put('/quotes/:quote_id',quoteController.update)
router.delete('/quotes/:quote_id', quoteController.delete);
*/

router.get('/quotes', quoteController.getAll);
router.post('/quotes',quoteController.create);
router.get('/quotes/:quote_id',quoteController.getOne)
router.patch('/quotes/:quote_id',quoteController.update)
router.put('/quotes/:quote_id',quoteController.update)
router.delete('/quotes/:quote_id', quoteController.delete);
// Export API routes
module.exports = router;