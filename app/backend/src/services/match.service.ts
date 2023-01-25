/* eslint-disable max-lines-per-function */
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  static async findAll() {
    const result = await MatchModel.findAll({
      include: [
        { model: TeamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      raw: true,
      nest: true,
    });

    return { status: 200, message: result };
  }
}

MatchService.findAll();
