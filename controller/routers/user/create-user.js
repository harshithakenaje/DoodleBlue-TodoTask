import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { body } from 'express-validator/check';

import User from '../../../db/models/user';
import { errorFirst as eF } from '../../../common-utils';

export const preCreateUser = [
  body('email', 'required').not().isEmpty().isEmail().withMessage('invalid email format').normalizeEmail(),
  body('password', 'required').not().isEmpty().isLength({ min: 6 })
    .withMessage('Password must be minimum of 6 characters long').escape(),
];

export const createUser = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  const [userErr, userDoc] = await eF(User.findOne({ email }));
  if (userErr) {
    return next(createError(500, 'Internal server error'));
  }
  console.log(userDoc);
  if (userDoc) {
    return next(createError(400, 'User already exists with this email Id', { expose: false }));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
  });

  const [err, doc] = await eF(user.save());
  if (err) {
    return next(createError(500, err));
  }
  return res.send(doc);
};
