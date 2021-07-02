import { Router } from 'express';
import { CategoryController, UserController } from './controllers';

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController(); 

router.post('/user/create', userController.create);
router.post('/category/create', categoryController.create);

export { router }