const User = require('../models/UserSchema');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');



passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username : username }).exec();
      if (!user) {
        return done(null, false, { message: 'Incorrect Username.' });
      }
      if (password !== user.password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(async (user, done) => {
  try {
    const userId = user._id;
    done(null, userId);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;