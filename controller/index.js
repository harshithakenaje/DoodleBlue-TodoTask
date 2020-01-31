import { Router } from '../common-utils/express-utils';

import { authenticateRequest } from '../middlewares/authenticateRequest';
import { todoRouter } from './routers/todo';
import { userRouter } from './routers/user';

const router = new Router();

router.use(userRouter);

router.use(authenticateRequest);

router.use(todoRouter);

export default router;
