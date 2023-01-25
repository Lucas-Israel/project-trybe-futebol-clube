import { Router } from 'express';
import validateMatchWithSameTeam,
{ matchBodyCheck,
  teamExistanceCheck } from '../middlewares/match.validation';
import tokenValidation from '../middlewares/token.validation';

import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.findAll);
router.post(
  '/',
  tokenValidation,
  matchBodyCheck,
  teamExistanceCheck,
  validateMatchWithSameTeam,
  MatchController.createMatchInProgress,
);
router.patch('/:id/finish', MatchController.finishMatchInProgress);

export default router;
