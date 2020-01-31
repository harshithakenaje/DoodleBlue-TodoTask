import createError from 'http-errors';
import { body, param } from 'express-validator/check';
import { ObjectID } from 'mongodb';

import Todo from '../../../db/models/todo';
import { errorFirst as eF } from '../../../common-utils';

export const preUpdateTodo = [
  param('id', 'required').isString().trim().custom((value) => {
    if (!ObjectID.isValid(value)) {
      return Promise.reject(new Error('id should be valid ObjectID'));
    }
    return Promise.resolve();
  }),
  body('taskName').optional().isString().trim(),
  body('completed').optional().isBoolean().toBoolean(),
];

export const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const {
    taskName,
    completed,
  } = req.body;
  if (!taskName && (completed === undefined || completed === null)) {
    return next(createError(422, 'Either taskName or completed should be present', { expose: false }));
  }
  const filter = { _id: id, _creator: req.user.userId };
  const update = {
    ...(taskName ? { taskName } : {}),
    ...(completed !== undefined && completed !== null ? { completed } : {}),
    ...(completed ? { completedAt: new Date().toString() } : {}),
    editedAt: new Date().toISOString(),
  };
  const [err, updatedTodo] = await eF(Todo.findOneAndUpdate(filter, update, { new: true }));
  if (err) {
    if (err.status === 404) {
      return next(createError(404, err, { expose: false }));
    }
    return next(createError(500, err));
  }
  if (!updatedTodo) {
    return next(createError(404, 'Specified TODO does not exists', { expose: false }));
  }
  return res.send(updatedTodo);
};
