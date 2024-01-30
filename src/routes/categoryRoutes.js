const express = require('express')
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { isAuthenticated } = require('../middleware/verify_auth');

router.get('/all', isAuthenticated, categoryController.viewAllCategories);
router.post('/add/new', isAuthenticated, categoryController.addCategory);
router.get('/view/:id', isAuthenticated, categoryController.viewCategory);
router.patch('/edit/:id', isAuthenticated, categoryController.editCategory);
router.delete('/delete/:id', isAuthenticated, categoryController.deleteCategory);



module.exports = router