import { Router } from 'express';

import MatchController from '../controllers/match.controller';

const router = Router();

router.get('/', MatchController.findAll);

export default router;
