const express = require('express');
router = express.Router();
const addPercentage  = require('../controllers/percentageController');
const { isAuthenticated } = require('../middleware/verify_auth');

  /**
 * @swagger
 * tags:
 *   name: Percentage
 *   description: Operations about users setting
 */



/**
 * @swagger
 * /percent/add/new:
 *   post:
 *     tags : [Percentage]
 *     summary: Set percentages 
 *     responses:
 *       200:
 *         description: set percentage of your balances
 */

router.post('/add/new', isAuthenticated, addPercentage);



module.exports = router