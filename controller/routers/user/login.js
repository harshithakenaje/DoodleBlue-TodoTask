import { body } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createError from 'http-errors';

import CONFIG from '../../../config';
import User from '../../../db/models/user';
import { errorFirst as eF } from '../../../common-utils';

export const preLogin = [
  body('email', 'required').not().isEmpty().isEmail().withMessage('invalid email format').normalizeEmail(),
  body('password', 'required').not().isEmpty(),
];

export const login = async (req, res, next) => {
  const {
    email,
    password: incomingPassword,
  } = req.body;
  const [err, userDoc] = await eF(User.findOne({ email }));
  if (err) {
    return next(createError(500, err));
  }
  if (!userDoc) {
    return next(createError(404, 'User does not exists', { expose: false }));
  }
  const { password: passwordHash, _id: userId } = userDoc;
  const isCorrectPassword = await bcrypt.compare(incomingPassword, passwordHash);
  if (!isCorrectPassword) {
    return next(createError(401, 'username or password is incorrect', { expose: false }));
  }
  const payload = {
    userData: {
      email,
      userId,
    },
  };
  const token = jwt.sign(payload, CONFIG.JWT_SECRET_PASS, {
    expiresIn: '1h',
  });
  return res.send({
    message: 'Logged in successfully',
    token,
  });
};
