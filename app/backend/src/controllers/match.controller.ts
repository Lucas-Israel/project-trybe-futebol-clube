import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  static async findAll(req: Request, res: Response) {
    if (req.query.inProgress) {
      const queryValue = req.query.inProgress === 'true';
      const result = await MatchService.findAllInProgress({ inProgress: queryValue });
      console.log('abc');
      return res.status(result.status).json(result.message);
    }

    const result = await MatchService.findAll();

    res.status(result.status).json(result.message);
  }
}
