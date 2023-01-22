import { Router } from 'express';
import loginValidation from '../middlewares/login.validation';

import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/', loginValidation, userController.findOne);

export default router;
