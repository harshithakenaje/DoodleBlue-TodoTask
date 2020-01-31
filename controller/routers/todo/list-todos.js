import createError from 'http-errors';

import Todo from '../../../db/models/todo';
import { errorFirst as eF } from '../../../common-utils';

export const listTodos = async (req, res, next) => {
  const [err, todos] = await eF(Todo.find({ _creator: req.user.userId }));
  if (err) {
    return next(createError(500, err));
  }
  return res.send({
    todos,
  });
};
