const express = require("express");
const router = express.Router();
const passport = require('../middleware/auth');
const userController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations about users
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags : [Users]
 *     summary: Register User
 *     responses:
 *       200:
 *         description: Register New User
 */

router.post("/register", userController.registerUser);

/**
 * @swagger
 * users/login:
 *   post:
 *     tags : [Users]
 *     summary: login as a user
 *     responses:
 *       200:
 *         description: Login to system
 */

router.post("/login", userController.loginUser);
/**
 * @swagger
 * users/logout:
 *   get:
 *     tags : [Users]
 *     summary: Logout User
 *     responses:
 *       200:
 *         description: Logout
 */

router.get("/logout", userController.logoutUser);

/**
 * @swagger
 * users/view/{id}:
 *   get:
 *     tags : [Users]
 *     summary: View User
 *     responses:
 *       200:
 *         description: View
 */

router.get("/view/:id", userController.getUser);

/**
 * @swagger
 * users/edit/{id}:
 *   patch:
 *     tags : [Users]
 *     summary: Edit User
 *     responses:
 *       200:
 *         description: Edit
 */

router.patch("/edit/:id", 
passport.authenticate("local"),
userController.editUser);
/**
 * @swagger
 * users/delete/{id}:
 *   delete:
 *     tags : [Users]
 *     summary: Delete User
 *     responses:
 *       200:
 *         description: Delete
 */
router.delete("/delete/:id",
passport.authenticate("local"),
 userController.deleteUser);

router.get("/", userController.getAllUsers);
/**
 * @swagger
 * users/password/reset:
 *   post:
 *     tags : [Users]
 *     summary: Passowrd Reset
 *     responses:
 *       200:
 *         description: Edit
 */

router.post("/password/reset", userController.resetPassword);
/**
 * @swagger
 * users/password/reset/verify:
 *   post:
 *     tags : [Users]
 *     summary: Passowrd Reset
 *     responses:
 *       200:
 *         description: Edit
 */

router.post("/password/reset/verify", userController.verifyToken);

module.exports = router;
