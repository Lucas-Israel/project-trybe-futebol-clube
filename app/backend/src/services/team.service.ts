import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  static async findAll() {
    const result = (await TeamModel.findAll()).map((item) => item.dataValues);

    return { status: 200, message: result };
  }
}
