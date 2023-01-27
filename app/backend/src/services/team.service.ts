import { Sequelize } from 'sequelize';
import { LeaderBoardReturn } from '../interfaces/leaderBoard.interface';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { defeats, goalsDone, goalsReceived, howManyGames,
  objGeneratorForLeaderBoards, victories,
} from './utils/leaderboardHelper';

export default class TeamService {
  static async findAll() {
    const result = await TeamModel.findAll({ raw: true });

    return { status: 200, message: result };
  }

  static async findByPK(id: number) {
    const result = await TeamModel.findByPk(id, { raw: true });

    return { status: 200, message: result };
  }

  static async getLeaderboard() {
    const result = await TeamModel.findAll({
      raw: true,
      nest: true,
      attributes: { exclude: ['id'] },
      include: [{ model: MatchModel,
        as: 'matchModel',
        on: Sequelize.where(
          Sequelize.col('TeamModel.id'),
          '=',
          Sequelize.col('matchModel.home_team_id'),
        ),
        where: { inProgress: false },
        attributes: { exclude: ['inProgress'] },
      }],
      order: ['teamName'],
    });

    return result as unknown as LeaderBoardReturn[];
  }

  static async formingLeaderBoard() {
    const homeTeams = await TeamService.getLeaderboard();
    const totalMatches = howManyGames(homeTeams);
    const totalVictories = victories(homeTeams);
    const totalDefeats = defeats(homeTeams);
    const goalsReceivedd = goalsReceived(homeTeams);
    const goalsDonee = goalsDone(homeTeams);

    const toSend = { totalMatches, totalVictories, totalDefeats, goalsReceivedd, goalsDonee };

    const returnForLeaderboards = objGeneratorForLeaderBoards(toSend);

    return { status: 200, message: returnForLeaderboards };
  }
}
