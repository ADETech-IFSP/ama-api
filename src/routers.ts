import { Router } from 'express';
import { CategoryController, PetController, QuestionController, UserController  } from './controllers';

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController(); 
const questionController = new QuestionController();
const petController = new PetController();

router.post('/user/create', userController.create);
router.get('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.read);
router.post('/forum/create', questionController.create);
router.get('/forum/:id', questionController.read);
router.get('/forum/delete/:id', questionController.delete);

router.post('/category/create',categoryController.create);

router.post('/pet/create', petController.create);

export { router }