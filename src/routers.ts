import { Router } from 'express';
import { AuthController, CategoryController, PetController, QuestionController, UserController , } from './controllers';
import { CommentController } from './controllers/CommentController';


const router = Router();
const userController = new UserController();
const categoryController = new CategoryController(); 
const questionController = new QuestionController();
const petController = new PetController();
const authController = new AuthController();
const commentController = new CommentController();



router.post('/user/create', userController.create);
router.get('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.read);

router.post('/forum/create', questionController.create);
router.get('/forum/:id', questionController.read);
router.delete('/forum/delete/:id', questionController.delete);
router.put('/forum/update/:id', questionController.update);

router.post('/comment/create',commentController.create);
router.get('/comment/:id',commentController.read);
router.delete('/comment/delete/:id',commentController.delete);
router.put('/comment/update:id',commentController.update);

router.post('/category/create',categoryController.create);
router.get('/category/:id',categoryController.read);
router.delete('/category/delete/:id',categoryController.delete);
router.post('/category/create',categoryController.update);


router.post('/pet/create', petController.create);
router.get('/pet/:id', petController.read);
router.delete('/pet/delete/:id', petController.delete);
router.put('/pet/update/:id', petController.update);

router.post('/auth/login', authController.doLogin);
router.post('/auth/validate', authController.validate);

export { router }