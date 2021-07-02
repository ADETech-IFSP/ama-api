import { Router } from 'express';
import { UserController, QuestionController } from './controllers';

const router = Router();
const userController = new UserController();
const questionController = new QuestionController();

router.post('/user/create', userController.create);
router.get('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.read);
router.post('/forum/create', questionController.create);
router.get('/forum/:id', questionController.read);

export { router }