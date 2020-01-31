import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    // validate: {
    // validator: (value) => {
    // const emailRegex = '^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$';
    // return new RegExp(emailRegex).test(value);
    // },
    // message: 'Not a valid email id',
    // },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
