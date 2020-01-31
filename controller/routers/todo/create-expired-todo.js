import ExpireTodo from '../../../db/models/expiry-todo';
import { errorFirst as eF } from '../../../common-utils';
import logger from '../../../logger';

const createExpiryTodo = async (todo) => {
//   const { completed, taskId, taskName, expiredTime, editedAt, _creator } = todo;
  const expiryTodo = new ExpireTodo(todo);

  const [err, doc] = await eF(expiryTodo.save());
  if (err) {
    logger.error()(err);
  }
  logger.log()('Sucessfully added to expiry', doc);
};

export default createExpiryTodo;
