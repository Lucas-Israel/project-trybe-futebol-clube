import { Router } from 'express';

import TeamController from '../controllers/team.controller';

const router = Router();

router.get('/', TeamController.findAll);

export default router;
