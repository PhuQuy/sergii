import mongoose, {
  Schema
} from 'mongoose';

const surveySchema = new Schema({
  name: Schema.Types.String,
  gender: Schema.Types.String,
  birthDay: Schema.Types.Date,
  postCode: Schema.Types.String,
  email: Schema.Types.String,
  consumedPill: Schema.Types.String,
  preferenceConsumedPill: Schema.Types.String,
  advantageGeneric: Schema.Types.String,
  renewSubscriptionTime: Schema.Types.String,
  sideEffect: Schema.Types.String,
  physicalExam: Schema.Types.String
});

mongoose.model('Survey', surveySchema);
