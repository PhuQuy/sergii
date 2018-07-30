import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import config from '../../../config';

const Survey = mongoose.model('Survey');

export function getAllUsers(req, res) {
  Survey.find({})
    .then((surveys) =>
      res.send(surveys)
    )
    .catch(() => res.sendStatus(500))
}

const transporter = nodemailer.createTransport({
  service: config.emailSerive,
  auth: {
    user: config.emailAuth.username,
    pass: config.emailAuth.password
  }
});

export function createSurvey(req, res) {
  new Survey({
      name: req.body.name,
      gender: req.body.gender,
      birthDay: req.body.birthDay,
      postCode: req.body.postCode,
      email: req.body.email,
      questions: req.body.questions
    }).save().then(() => {
      let mailOptions = {
        from: config.emailSendFrom,
        to: req.body.email,
        subject: 'Sending Email from Femito',
        text: 'Test'
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
}
