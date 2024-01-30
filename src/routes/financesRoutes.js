const express = require('express');
const router = express.Router();
const { addFinances } = require("../controllers/financesController");
const { isAuthenticated }  = require('../middleware/verify_auth');


router.post("/add/new", isAuthenticated, addFinances);


module.exports = router