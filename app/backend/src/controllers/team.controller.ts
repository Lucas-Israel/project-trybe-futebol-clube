import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async findAll(req: Request, res: Response) {
    const result = await TeamService.findAll();

    res.status(result.status).json(result.message);
  }

  static async findByPK(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TeamService.findByPK(+id);
    res.status(result.status).json(result.message);
  }

  static async formedLeaderBoard(req: Request, res: Response) {
    const { status, message } = await TeamService.formingLeaderBoard();
    res.status(status).json({ message });
  }
}
