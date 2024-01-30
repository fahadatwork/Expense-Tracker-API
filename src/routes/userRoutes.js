const express = require("express");
const router = express.Router();
const passport = require('../middleware/auth');
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/logout", userController.logoutUser);

router.get("/view/:id", userController.getUser);

router.patch("/edit/:id", 
passport.authenticate("local"),
userController.editUser);

router.delete("/delete/:id",
passport.authenticate("local"),
 userController.deleteUser);

router.get("/", userController.getAllUsers);

router.post("/password/reset", userController.resetPassword);

router.post("/password/reset/verify", userController.verifyToken);

module.exports = router;
