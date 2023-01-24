import TeamModel from '../database/models/TeamModel';

export default class TeamService {
  static async findAll() {
    const result = await TeamModel.findAll({ raw: true });

    return { status: 200, message: result };
  }

  static async findByPK(id: number) {
    const result = await TeamModel.findByPk(id, { raw: true });

    return { status: 200, message: result };
  }
}
