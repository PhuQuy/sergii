import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import config from '../../../config';

const User = mongoose.model('User');

const Role = {
  "ADMIN": 1,
  "USER": 2
}
const transporter = nodemailer.createTransport({
  // host: `${config.emailHost}`,
  // port: config.emailPort,
  // secure: false

  service: 'gmail',
  auth: {
    user: 'phuquy.uit@gmail.com',
    pass: 'Ngokylong11@@'
  }
});

export async function getAllUsers(req, res, next) {
//   console.log(req.session.userId);

//   let user = await User.findById(req.session.userId);
//   if (!user) {
//     var err = new Error('Not authorized!');
//     err.status = 401;
//     return next(err);
//   }
  User.find()
    .then((users) => res.send(users))
    .catch(() => res.sendStatus(500))
}

export function getAllUserById(req, res) {
  User.find({
      _id: req.params.id
    })
    .then((user) => res.send(user))
    .catch(() => res.sendStatus(500))
}

export function getAllUserBySurvey(req, res) {
  User.find({
      survey: req.params.id
    })
    .then((user) => res.send(user))
    .catch(() => res.sendStatus(500))
}

export function getAllUserByEmail(req, res) {
  User.find({
      email: req.body.email
    })
    .then((user) => res.send(user))
    .catch(() => res.sendStatus(500))
}

export function checkExistEmail(req, res, next) {
  User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (user) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch(() => res.sendStatus(500))
}


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 30; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function resetPassword(req, res, next) {
  User.findOne({
      resetString: req.body.resetString
    }).then((user) => {
      if (!user) {
        var err = new Error('Reset String Not Found!');
        err.status = 400;
        return next(err);
      }
      user.password = req.body.newPassowrd;
      user.resetString = '';
      user.save().then(() => {
        res.send(true);
      })
    })
    .catch((error) => {
      res.send(false);
    });
}

export function forGotPassword(req, res, next) {
  User.findOne({
      email: req.body.email
    })
    .then((user) => {
      if (user) {
        let randomString = makeid();
        user.resetString = user._id + randomString;
        user.save().then(() => {
          console.log(user);

          let mailOptions = {
            // from: config.emailSendFrom,
            from: 'phuquy.uit@gmail.com',
            to: req.body.email,
            subject: 'Sending Email from Femito',
            text: `${req.protocol}://${req.get('host')}/reset-password/${user.resetString}`
          };
          console.log(mailOptions.text);
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.send(true);
            }
          });
        })
      } else {
        res.send(false);
      }
    })
    .catch(() => res.sendStatus(500))
}

export function createUser(req, res) {
  new User({
      email: req.body.email,
      password: req.body.password,
      role: Role.USER,
      survey: req.body.surveyId
    }).save().then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send(error);
    });
}

export function login(req, res, next) {
  if (req.body.email == config.adminEmail && req.body.password == config.adminPassword) {
    req.session.userId = 999;
    res.send({
      email: config.adminEmail,
      password: config.adminPassword,
      role: Role.ADMIN
    });
    return;
  }
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(error);
    }

    // test a matching password
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }
      if (isMatch) {
        req.session.userId = user._id;
        res.send(user);
      } else {
        var error = new Error('Wrong email or password.');
        error.status = 401;
        return next(error);
      }
    });
  });
}
