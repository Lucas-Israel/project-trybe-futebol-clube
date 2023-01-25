import { createMatchParams } from '../interfaces/Services.interface';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

export default class MatchService {
  static async findAll() {
    const result = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      raw: true,
      nest: true,
    });

    return { status: 200, message: result };
  }

  static async findAllInProgress(query: { inProgress: boolean }) {
    const searchNostring = {
      where: query,
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      raw: true,
      nest: true,
    };

    const result = await MatchModel.findAll(searchNostring);

    return { status: 200, message: result };
  }

  static async createMatchInProgress(params: createMatchParams) {
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = params;
    const { dataValues } = await MatchModel.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: 1,
    });

    return { status: 201, message: dataValues };
  }
}
