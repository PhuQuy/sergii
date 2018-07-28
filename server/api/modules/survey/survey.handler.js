import mongoose from 'mongoose';

const Survey = mongoose.model('Survey');

export function getAllUsers(req, res) {
  Survey.find({})
    .then((surveys) =>
      res.send(surveys)
    )
    .catch(() => res.sendStatus(500))
}

export function createSurvey(req, res) {
  new Survey({
    name: req.body.name,
    gender: req.body.gender,
    birthDay: req.body.birthDay,
    postCode: req.body.postCode,
    email: req.body.email,
    consumedPill: req.body.consumedPill,
    preferenceConsumedPill: req.body.preferenceConsumedPill,
    advantageGeneric: req.body.advantageGeneric,
    renewSubscriptionTime: req.body.renewSubscriptionTime,
    sideEffect: req.body.sideEffect,
    physicalExam: req.body.physicalExam
  }).save();
  res.sendStatus(200);
}
