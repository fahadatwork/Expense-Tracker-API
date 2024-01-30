
exports.isAuthenticated = async(req, res, next) => {
    if (req.user && req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  }