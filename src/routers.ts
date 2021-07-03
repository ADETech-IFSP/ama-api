import { Router } from 'express';
import { CategoryController, QuestionController, UserController, } from './controllers';

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController(); 
const questionController = new QuestionController();


router.post('/user/create', userController.create);
router.get('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.read);

router.post('/forum/create', questionController.create);
router.get('/forum/:id', questionController.read);


router.post('/category/create',categoryController.create);



export { router }