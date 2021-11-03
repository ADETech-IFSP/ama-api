import { Router } from 'express';
import { AuthController, FoodController, PetController, PlannerController, 
QuestionController, TaskController, UserController, VotesController ,  } from './controllers';
import { BreedController } from './controllers/BreedController';
import { CommentController } from './controllers/CommentController';
import { SpeciesController } from './controllers/SpeciesController';

const router = Router();
const userController = new UserController();
const questionController = new QuestionController();
const petController = new PetController();
const authController = new AuthController();
const commentController = new CommentController();
const breedController = new BreedController();
const speciesController = new SpeciesController();
const foodController = new FoodController();
const plannerController = new PlannerController();
const taskController = new TaskController();
const votesController = new VotesController();

router.post('/user/create', userController.create);
router.get('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.read);
router.post('/user/photo-upload', userController.uploadProfilePhoto);
router.post('/user/validate', userController.validate);
router.get('/user/account/confirm/:id/:confirm_code', userController.confirm);
router.post('/user/account/validate', userController.validateAccount);
router.get('/users/:id/pets', petController.getAllPets);

router.post('/forum/create', questionController.create);
router.get('/forum/:id', questionController.read);
router.delete('/forum/delete/:id', questionController.delete);
router.put('/forum/update/:id', questionController.update);

router.post('/comment/create', commentController.create);
router.get('/comment/:id', commentController.read);
router.delete('/comment/delete/:id', commentController.delete);
router.put('/comment/update:id', commentController.update);

router.get('/species',speciesController.read);
router.get('/species/:id/breed',breedController.read);

router.post('/pets', petController.create);
router.get('/pets/:id', petController.read);
router.delete('/pets/:id', petController.delete);
router.put('/pet/:id', petController.update);
router.get('/pets/:id/foods');

// Adicionar rotas das tabelas food, planner, task (getAllTasks) e votes

router.post('/auth/login', authController.doLogin);
router.post('/auth/validate', authController.validate);

export { router }