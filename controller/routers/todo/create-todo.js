import createError from 'http-errors';
import { body } from 'express-validator/check';

import Todo from '../../../db/models/todo';
import { errorFirst as eF } from '../../../common-utils';

export const preCreateTodo = [
  body('taskName', 'required').isString().trim(),
  body('expiry').isISO8601().toDate().custom((value, { req }) => {
    if (value < new Date()) {
      return Promise.reject(new Error('Expiry date cannot be lesser than today date'));
    }
    const isCompletedAtPresent = !!req.body.completedAt;
    if (!isCompletedAtPresent) {
      return Promise.resolve();
    }
    const completedAt = new Date(req.body.completedAt).getTime();
    const expiry = new Date(req.body.expiry).getTime();
    if (expiry < completedAt) {
      return Promise.reject(new Error('Expiry time cannot be lesser than completedAt time'));
    }
    return Promise.resolve();
  }),
  body('completedAt').optional().isISO8601().toDate(),
  body('completed').optional().isBoolean().toBoolean()
    .custom((value, { req }) => {
      const isCompletedAtPresent = !!req.body.completedAt;
      if (!isCompletedAtPresent) {
        return Promise.reject(new Error('completedAt key should be present for completed tasks'));
      }
      return Promise.resolve();
    }),
];

export const createTodo = async (req, res, next) => {
  const {
    taskName,
    expiry,
    completed = false,
    completedAt,
  } = req.body;
  const todo = new Todo({
    taskName,
    expiry,
    ...(completedAt ? { completedAt } : {}),
    completed: !!completed,
    editedAt: new Date().toISOString(),
    _creator: req.user.userId,
  });

  const [err, doc] = await eF(todo.save());
  if (err) {
    return next(createError(500, err));
  }
  return res.send(doc);
};
