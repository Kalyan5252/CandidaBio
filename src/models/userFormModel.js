import mongoose, { models, model } from 'mongoose';

const userFormSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const userForms = models?.userForms || model('userForms', userFormSchema);

export default userForms;
