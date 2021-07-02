import { Router } from 'express';
import { CategoryController, UserController } from './controllers';

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController(); 

router.post('/user/create', userController.create);
router.get('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.read);


router.post('/category/create',categoryController.create);

export { router }