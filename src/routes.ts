import { Router } from 'express';
import { uniqueEmail } from './validators/userValidator';
import * as homeController from './controllers/homeController';
import * as userController from './controllers/userController';
import * as authController from './controllers/authController';

const router = Router();
router.get('/', homeController.index);

router.post('/register', uniqueEmail, authController.register);

router.get('/users', userController.index);
router.get('/users/:id', userController.show);

export default router;
