import express from 'express';
import User from '../controllers/users';
import { tokenValidator, signupValidator, loginValidator } from '../middlewares/auth';

const router = express.Router();

router.post('/auth/create-user', tokenValidator.validateAdminToken, signupValidator, User.signupUser);
router.post('/auth/signin', loginValidator, User.logInUser);

export default router;
