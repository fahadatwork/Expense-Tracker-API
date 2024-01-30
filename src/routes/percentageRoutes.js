const express = require('express');
router = express.Router();
const addPercentage  = require('../controllers/percentageController');
const { isAuthenticated } = require('../middleware/verify_auth');



router.post('/add/new', isAuthenticated, addPercentage);



module.exports = router