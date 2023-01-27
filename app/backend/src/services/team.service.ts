import { Sequelize } from 'sequelize';
import { LeaderBoardReturn } from '../interfaces/leaderBoard.interface';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { defeats, formingObjForGeneralLeaderboard, goalsDone,
  goalsReceived, howManyGames, objGeneratorForLeaderBoards, toAdd, toSort, victories,
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

    toSort(returnForLeaderboards);

    return { status: 200, message: returnForLeaderboards };
  }

  static async generalLeaderBoard() {
    const homeBoard = (await TeamService.formingLeaderBoard('home')).message;

    const awayBoard = (await TeamService.formingLeaderBoard('away')).message;

    const organizer = homeBoard.map((team) => {
      const awa = awayBoard.find((awayTeam) => awayTeam.name === team.name);
      return { home: team, away: awa };
    });

    const finalResult = formingObjForGeneralLeaderboard(organizer);

    toSort(finalResult);

    return { status: 200, message: finalResult };
  }
}
