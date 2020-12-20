import express from 'express';
import { loginValidator, registerValidator } from '../utils/validators';
import { UserController } from '../controllers/UserController';


const router = express.Router();

// login
router.post('/login', loginValidator, UserController.login)

// reg
router.post('/register', registerValidator, UserController.registration)

// logout
router.post('/logout', UserController.logout)

// check
router.post('/check', UserController.check)

export { router as userRouter };