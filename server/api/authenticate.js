import mongoose from 'mongoose';
const User = mongoose.model('User');

module.exports = function (req, res, next) {
  if (req.session.admin) {
    return next();
  }
  User.findById(req.session.userId).then(user => {
    if (!user) {
      var err = new Error('Not authorized!');
      err.status = 401;
      return next(err);
    } else {
      return next();
    }
  })
};
