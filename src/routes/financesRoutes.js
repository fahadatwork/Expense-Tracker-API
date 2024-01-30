const express = require('express');
const router = express.Router();
const { addFinances } = require("../controllers/financesController");
const { isAuthenticated }  = require('../middleware/verify_auth');

 /**
 * @swagger
 * tags:
 *   name: Finances
 *   description: Add A new finance operation
 */

 /**
 * @swagger
 * /finances/add/new:
 *   post:
 *     tags : [Finances]
 *     summary: Set percentages 
 *     responses:
 *       200:
 *         description: set percentage of your balances
 */
router.post("/add/new", isAuthenticated, addFinances);


module.exports = router