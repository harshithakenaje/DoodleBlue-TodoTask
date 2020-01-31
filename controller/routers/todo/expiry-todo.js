import Todo from '../../../db/models/todo';
import createExpiryTodo from './create-expired-todo';
import deleteExpirytodo from './delete-todo';

const getAndDeleteExpiredTodo = () => {
  Todo.find({
    'expiry': { 
      $lte: new Date(),
    }
  }).then((todos) => 
    
    todos.forEach(todo => {
        let expiryObj = {};
        expiryObj.completed = todo.completed;
        expiryObj.taskId = todo._id;
        expiryObj.taskName = todo.taskName; 
        expiryObj.expiredTime = todo.expiry; 
        expiryObj.editedAt = todo.editedAt; 
        expiryObj._creator = todo._creator; 

        createExpiryTodo(expiryObj);
        deleteExpirytodo(todo._id);
    }));
};

export default getAndDeleteExpiredTodo;
