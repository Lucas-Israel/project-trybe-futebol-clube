import { Router } from 'express';

import TeamController from '../controllers/team.controller';

const router = Router();

router.get('/', TeamController.findAll);
router.get('/:id', TeamController.findByPK);

export default router;
