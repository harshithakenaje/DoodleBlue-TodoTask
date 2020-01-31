import createError from 'http-errors';
import {
  verify,
} from 'jsonwebtoken';

import CONFIG from '../config';
import logger from '../logger';

const verifyJwt = (token, req) => new Promise((resolve) => {
  verify(token, CONFIG.JWT_SECRET_PASS, (error, data) => {
    if (error) return resolve([error, {}]);
    const {
      userData: {
        email,
        userId,
      } = {},
    } = data || {};
    return resolve([null, {
      email,
      userId,
    }]);
  });
});

export const authenticateRequest = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const jwtToken = authHeader && authHeader.split(' ')[1];
  if (!jwtToken) {
    return next(createError(
      401,
      'Authentication details missing', {
        expose: false,
      },
    ));
  }
  const [error, { email, userId } = {}] = await verifyJwt(jwtToken, req);
  if (error) {
    logger.debug(req.id)(error);
    return next(createError(403, error.message || 'Invalid token', { expose: false }));
  }
  if (!userId) {
    return next(createError(403, 'Could not find userId in token payload', { expose: false }));
  }
  req.user = {
    email,
    userId,
  };
  return next();
};
