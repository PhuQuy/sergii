import mongoose from 'mongoose';
import config from '../../../config';
import transporter from './../../lib';
const Survey = mongoose.model('Survey');

const User = mongoose.model('User');
const Role = {
  "ADMIN": 1,
  "USER": 2
}
const moment = require('moment');

export async function getAllUsers(req, res, next) {
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
      console.log(user);
      console.log(req.body.email);


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
            template: 'reset-password',
            context: {
              name: user.name,
              link: `${req.protocol}://${req.get('host')}/reset-password/${user.resetString}`
            },
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

export async function createUser(req, res) {
  let survey = await Survey.findById(req.body.survey);
  console.log(survey);

  new User({
      email: req.body.email,
      password: req.body.password,
      role: Role.USER,
      survey: req.body.survey,
      postCode: survey ? survey.postCode : null,
      registrationDate: moment(new Date()).format('lll'),
      activeSubscription: true,
      daysLeft: 0
    }).save().then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.send(error);
    });
}

export function login(req, res, next) {
  if (req.body.email == config.adminEmail && req.body.password == config.adminPassword) {
    req.session.admin = true;
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
      return next(err);
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

export function deleteUser(req, res) {
  User.deleteOne({
    _id: req.params.id
  }).then(() => {
    res.send(true)
  }).catch(() => res.sendStatus(500))
}

export function logout(req, res, next) {
  req.session.admin = false;
  req.session.userId = null;
  res.send(true);
}
