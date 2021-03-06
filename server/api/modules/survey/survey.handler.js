import mongoose from 'mongoose';
import config from '../../../config';
import transporter from './../../lib';

const Survey = mongoose.model('Survey');

export function getAllUsers(req, res) {


  Survey.find({})
    .then((surveys) => {
      res.send(surveys)
    })
    .catch((error) => res.sendStatus(500))
}

export function getAllUserById(req, res) {
  Survey.find({
      _id: req.params.id
    })
    .then((survey) =>
      res.send(survey)
    )
    .catch(() => res.sendStatus(500))
}

export function createSurvey(req, res) {
  let survey = new Survey({
    name: req.body.name,
    gender: req.body.gender,
    birthDay: req.body.birthDay,
    postCode: req.body.postCode,
    email: req.body.email,
    questions: req.body.questions
  });
  survey.save().then(() => {
      let mailOptions = {
        from: config.emailSendFrom,
        // from: 'phuquy.uit@gmail.com',

        to: survey.email,
        subject: 'Sending Email from Femito',
        template: 'verify',
        context: {
          name: survey.name,
          link: `${req.protocol}://${req.get('host')}/verify-password/${survey._id}`
        },
      };
      console.log(mailOptions.text);
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