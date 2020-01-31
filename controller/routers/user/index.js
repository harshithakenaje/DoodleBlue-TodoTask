import { reqErrorHandle as reH, Router } from '../../../common-utils';
import { reqValidation } from '../../validationCatcher';

import { preCreateUser, createUser } from './create-user';
import { preLogin, login } from './login';

const router = new Router();

router.post('/user', preCreateUser, reqValidation, reH(createUser));

router.post('/login', preLogin, reqValidation, reH(login));

export {
  router as userRouter,
};
