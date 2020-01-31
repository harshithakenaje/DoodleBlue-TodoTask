import { reqErrorHandle as reH, Router } from '../../../common-utils';
import { reqValidation } from '../../validationCatcher';

import { preCreateTodo, createTodo } from './create-todo';
import { preDeleteTodo, deleteTodo } from './delete-todo';
import { preUpdateTodo, updateTodo } from './update-todo';
import { listTodos } from './list-todos';

const router = new Router();

router.post('/todo', preCreateTodo, reqValidation, reH(createTodo));

router.delete('/todo/:id', preDeleteTodo, reqValidation, reH(deleteTodo));

router.patch('/todo/:id', preUpdateTodo, reqValidation, reH(updateTodo));

router.get('/todos', reH(listTodos));

export {
  router as todoRouter,
};
