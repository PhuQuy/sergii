import mongoose, {
  Schema
} from 'mongoose';

const orderSchema = new Schema({
  customerName: Schema.Types.String,
  email: Schema.Types.String,
  postalCode: Schema.Types.Number,
  address: Schema.Types.String,
  registrationDate: Schema.Types.Date,
  activeSubscription: Schema.Types.String,
  daysLeft: Schema.Types.Number
});

mongoose.model('Order', surveySchema);
