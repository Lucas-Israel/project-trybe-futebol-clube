import { Request, Response, NextFunction } from 'express';
import TeamModel from '../database/models/TeamModel';

export default function validateMatchWithSameTeam(req: Request, res: Response, next: NextFunction) {
  if (req.body.homeTeamId === req.body.awayTeamId) {
    return res
      .status(422).json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
}

export async function teamExistanceCheck(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  const listToCheck = [homeTeamId, awayTeamId];

  const result = await Promise.all(listToCheck
    .map((item) => TeamModel.findOne({ where: { id: item }, raw: true })));

  const conditionToCheck = result.some((item) => item === null);

  if (conditionToCheck) return res.status(404).json({ message: 'There is no team with such id!' });

  next();
}
