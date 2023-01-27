import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

router.get('/home', TeamController.formedLeaderBoard);

export default router;
