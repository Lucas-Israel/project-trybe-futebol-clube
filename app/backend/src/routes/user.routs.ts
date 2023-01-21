import { Router } from 'express';

import * as userController from '../controllers/user.controller';

const router = Router();

router.post('/', userController.findOne);

export default router;
