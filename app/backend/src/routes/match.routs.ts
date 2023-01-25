import { Router } from 'express';

import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.findAll);
router.post('/', MatchController.createMatchInProgress);
router.patch('/:id/finish', MatchController.finishMatchInProgress);

export default router;
