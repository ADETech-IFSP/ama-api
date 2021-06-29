import { Router } from 'express';
import { UserController } from './controllers';

const router = Router();
const userController = new UserController();

router.post('/user/create', userController.create);
router.get('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.read);

export { router }