const express = require('express');
router = express.Router();
const { addTransaction, editTransaction, getTransactionsbyGroup } = require('../controllers/transactionsController');
const { isAuthenticated } =  require('../middleware/verify_auth');


router.post('/add/new', isAuthenticated, addTransaction);
router.patch('/edit/:id', isAuthenticated, editTransaction);
router.get('/get/by/group-or-search', getTransactionsbyGroup );

module.exports = router

