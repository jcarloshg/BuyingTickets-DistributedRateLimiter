import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { zodValidate } from '../middlewares/zodValidate';
import { signUpInputSchema } from '../../application/auth/sign-up/models/entities/SignUpInput';
import { loginInputSchema } from '../../application/auth/login/models/entities/LoginInput';

const router = Router();
const controller = new AuthController();

router.post('/sign-up', zodValidate(signUpInputSchema), controller.signUp.bind(controller));
router.post('/login', zodValidate(loginInputSchema), controller.login.bind(controller));

export default router;
