import mongoose, {
  Schema
} from 'mongoose';

const surveySchema = new Schema({
  name: Schema.Types.String,
  gender: Schema.Types.String,
  birthDay: Schema.Types.Date,
  postCode: Schema.Types.String,
  email: Schema.Types.String,
  questions: Schema.Types.Array
});

mongoose.model('Survey', surveySchema);
