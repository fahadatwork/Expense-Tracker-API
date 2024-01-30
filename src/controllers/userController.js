const User = require("../models/UserSchema");
const userToken = require("../models/userTokenSchema");
const passport = require("passport");
const { nullCredentials, isPasswordShort } = "../utils/users";
const { randomToken, TemplateGenerator } = require("../utils/password_reset");
const { createMessage } = require("../functions/email-gateway");
const { validateUserCategoryFields } = require("../utils/validators")


exports.registerUser = async (req, res) => {
  try {
    if (nullCredentials(req.body)) {
      return req.status(400).json({ errors: "one or more fields are empty" });
    }

    if (isPasswordShort(req.body.password)) {
      return req.status(400).json({ errors: "password length is too short" });
    }
    const user = await User.create(req.body);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error_mesaage: "internal Server Error" });
    console.log(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error_mesaage: "internal Server Error" });
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error_mesaage: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error_mesaage: "internal Server Error" });
    console.log(error);
  }
};

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if(!validateUserCategoryFields(data)){
        
      return res.status(400).json({"error" : "fields empty"});
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ error_mesaage: "user not found check id and retry" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error_mesaage: "internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error_mesaage: "user does not exists" });
    }

    res.status(200).json({ deleted: deletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error_mesaage: "internal Server Error" });
  }
};

exports.loginUser = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
};

exports.logoutUser = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "We could not find a user with provided email" });
    }

    if (user) {
      const token = randomToken();
      const expiry = new Date();

      const newToken = new userToken({
        user: user._id,
        token: token,
        expiry: expiry.setHours(expiry.getHours() + 3),
      });
      await newToken.save();

      const template = TemplateGenerator(token, user.username, user.email);

      createMessage(user.email, template);

      res.send({
        message: "Email sent successfully to your provided email address",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyToken = async (req, res) => {
  const token = req.body.token;

  const tokenVerify = await userToken.find({ token: token });

  if (!token) {
    return res
      .status(404)
      .json({ error: "token provided does not seems a valid token" });
  }

  if (new Date(tokenVerify.expiry) < new Date()) {
    await userToken.findByIdAndDelete(tokenVerify._id);
    return res
      .status(410)
      .json({
        message: "token you provided seems expired, please generate again",
      });
  }

  await userToken.findByIdAndDelete(tokenVerify._id);
  return res.status(200).json({ message: "verification success" });
};
