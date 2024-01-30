const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middleware/verify_auth');

  /**
 * @swagger
 * tags:
 *   name: Category
 *   description: Operations about Categories
 */


/**
 * @swagger
 * /category/all:
 *   tags : Category
 *   get:
 *     summary: Retrieve a list of categories
 *     responses:
 *       200:
 *         description: 
 */

router.get('/all', isAuthenticated, categoryController.viewAllCategories);
/**
 * @swagger
 * /category/add/new:
 *   post:
 *     tags : [Category]
 *     summary: Add A new Category
 *     responses:
 *       200:
 *         description: 
 */
router.post('/add/new', isAuthenticated, categoryController.addCategory);
/**
 * @swagger
 * /category/view/{id}:
 *   get:
 *     tags : [Category]
 *     summary: view a category
 *     responses:
 *       200:
 *         description: 
 */
router.get('/view/:id', isAuthenticated, categoryController.viewCategory);
/**
 * @swagger
 * /category/view/{id}:
 *   patch:
 *     tags : [Category]
 *     summary: edit a category
 *     responses:
 *       200:
 *         description: 
 */
router.patch('/edit/:id', isAuthenticated, categoryController.editCategory);
/**
 * @swagger
 * /category/view/{id}:
 *   delete:
 *     tags : [Category]
 *     summary: edit a category
 *     responses:
 *       200:
 *         description: 
 */
router.delete('/delete/:id', isAuthenticated, categoryController.deleteCategory);



module.exports = router