import { Router } from 'express';
import loginValidation from '../middlewares/login.validation';

import userController from '../controllers/user.controller';

const router = Router();

router.post('/', loginValidation, userController.findOne);
router.get('/validate', userController.role);

export default router;
