import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  static async findAll(req: Request, res: Response) {
    const result = await TeamService.findAll();

    res.status(result.status).json(result.message);
  }
}
