import mongoose from 'mongoose';

const User = mongoose.model('User');

export function getAllUsers(req, res) {
  User.find()
    .then((users) => res.send(users))
    .catch(() => res.sendStatus(500))
}

export function createUser(req, res) {
  new User({
      email: req.body.email,
      password: req.body.password
    }).save().then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send(error);
    });
}

export function login(req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        res.send(user);
      } else {
        res.sendStatus(401);
      }
    });
  });
}
