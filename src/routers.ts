import { Router } from 'express';
<<<<<<< HEAD
import { CategoryController, QuestionController, UserController, } from './controllers';
=======
import { AuthController, CategoryController, PetController, QuestionController, UserController  } from './controllers';
>>>>>>> 9c4c11418e55977e0ef5e158bb427191219e40fe

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
router.delete('/forum/delete/:id', questionController.delete);
router.put('/forum/update/:id', questionController.update);

router.post('/category/create',categoryController.create);

<<<<<<< HEAD

=======
router.post('/pet/create', petController.create);

router.post('/auth/login', authController.doLogin);
router.post('/auth/validate', authController.validate);
>>>>>>> 9c4c11418e55977e0ef5e158bb427191219e40fe

export { router }