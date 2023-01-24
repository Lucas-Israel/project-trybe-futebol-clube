import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  static async findAll() {
    const result = await MatchModel.findAll({ raw: true });

    console.log(result);

    return { status: 200, message: result };
  }
}

MatchService.findAll();
