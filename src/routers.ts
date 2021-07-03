import { Router } from 'express';
import { AuthController, CategoryController, PetController, QuestionController, UserController  } from './controllers';

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController(); 
const questionController = new QuestionController();
const petController = new PetController();
const authController = new AuthController();

router.post('/user/create', userController.create);
router.get('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.read);

router.post('/forum/create', questionController.create);
router.get('/forum/:id', questionController.read);
router.get('/forum/delete/:id', questionController.delete);

router.post('/category/create',categoryController.create);

router.post('/pet/create', petController.create);

router.post('/auth/login', authController.doLogin);
router.post('/auth/validate', authController.validate);

export { router }