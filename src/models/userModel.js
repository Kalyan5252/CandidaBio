import mongoose, { models, model, mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: [true, 'Mail required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Mail required'],
  },
});

const users = models?.users || model('users', userSchema);

export default users;
