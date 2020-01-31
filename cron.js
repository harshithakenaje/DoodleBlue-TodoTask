import getAndDeleteExpiredTodo from './controller/routers/todo/expiry-todo'

const cron = require('node-cron');

cron.schedule('* * * * *', async () => { // scheduled cron on every minute. Since, need to be tested
  getAndDeleteExpiredTodo();
});
