export default interface CRUD<T> {
  findOne(param: unknown): Promise<T>
}

export interface createMatchParams {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface updatingBody {
  homeTeamGoals: number,
  awayTeamGoals: number,
}
