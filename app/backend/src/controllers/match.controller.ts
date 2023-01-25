import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async findAll(req: Request, res: Response) {
    const result = await MatchService.findAll();

    res.status(result.status).json(result.message);
  }
}
