import { Router } from 'express';
import validateMatchWithSameTeam from '../middlewares/match.validation';

import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.findAll);
router.post('/', validateMatchWithSameTeam, MatchController.createMatchInProgress);
router.patch('/:id/finish', MatchController.finishMatchInProgress);

export default router;
