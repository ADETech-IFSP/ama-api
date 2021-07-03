import { Router } from 'express';
import { PetController, UserController } from './controllers';

const router = Router();
const userController = new UserController();
const petController = new PetController();

router.post('/user/create', userController.create);
router.post('/pet/create', petController.create);

export { router }