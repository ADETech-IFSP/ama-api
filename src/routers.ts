import { Router } from 'express';
import { UserController } from './controllers';

const router = Router();
const userController = new UserController();

router.post('/user/create', userController.create);

export { router }