import { Sequelize } from 'sequelize';
import leaderBoardObj, { LeaderBoardReturn } from '../interfaces/leaderBoard.interface';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { defeats, goalsDone, goalsReceived, howManyGames,
  objGeneratorForLeaderBoards, toAdd, victories,
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

  static async getLeaderboard(param: 'home' | 'away') {
    const result = await TeamModel.findAll({
      raw: true,
      nest: true,
      attributes: { exclude: ['id'] },
      include: [{ model: MatchModel,
        as: 'matchModel',
        on: Sequelize.where(
          Sequelize.col('TeamModel.id'),
          '=',
          Sequelize.col(`matchModel.${param}_team_id`),
        ),
        where: { inProgress: false },
        attributes: { exclude: ['inProgress'] },
      }],
      order: ['teamName'],
    }) as unknown as LeaderBoardReturn[];

    result.push(toAdd);

    return result as unknown as LeaderBoardReturn[];
  }

  static async formingLeaderBoard(hOa: 'home' | 'away') {
    const homeTeams = await TeamService.getLeaderboard(hOa);
    const totalMatches = howManyGames(homeTeams, hOa);
    const totalVictories = victories(homeTeams, hOa);
    const totalDefeats = defeats(homeTeams, hOa);
    const goalsReceivedd = goalsReceived(homeTeams, hOa);
    const goalsDonee = goalsDone(homeTeams, hOa);

    const toSend = { totalMatches, totalVictories, totalDefeats, goalsReceivedd, goalsDonee, hOa };

    const returnForLeaderboards = objGeneratorForLeaderBoards(toSend);

    function toSort(list: leaderBoardObj[]) {
      return list.sort((a: leaderBoardObj, b: leaderBoardObj) => {
        if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
        if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
        if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
        return a.goalsOwn - b.goalsOwn;
      });
    }

    toSort(returnForLeaderboards);

    return { status: 200, message: returnForLeaderboards };
  }
}

TeamService.formingLeaderBoard('away');
