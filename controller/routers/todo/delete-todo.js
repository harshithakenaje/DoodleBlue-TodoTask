import createError from 'http-errors';
import { param } from 'express-validator/check';
import { ObjectID } from 'mongodb';

import Todo from '../../../db/models/todo';
import { errorFirst as eF } from '../../../common-utils';
import logger from '../../../logger';

export const preDeleteTodo = [
  param('id', 'required').isString().trim().custom((value) => {
    if (!ObjectID.isValid(value)) {
      return Promise.reject(new Error('id should be valid ObjectID'));
    }
    return Promise.resolve();
  }),
];

export const deleteTodo = async (req, res, next) => {
  const {
    id,
  } = req.params;
  const [err, data] = await eF(Todo.findOneAndRemove({ _id: id, _creator: req.user.userId }));
  if (!err) {
    return res.send(data);
  }
  if (err.status === 404) {
    return next(createError(404, err, { expose: false }));
  }
  return next(createError(500, err));
};

const deleteExpirytodo = async (id) => {
  const [err, data] = await eF(Todo.findOneAndRemove({ _id: id }));
  if (err) {
    logger.error()(err);
  }
  logger.log()('Expired to deleted successfully');
};

export default deleteExpirytodo;
