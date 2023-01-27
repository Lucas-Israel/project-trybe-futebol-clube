export default interface leaderBoardObj {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}

export interface LeaderBoardReturn {
  teamName: string,
  matchModel: {
    id: number,
    hometeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  }
}

export interface teamMatches { matches: number, homeTeam: string }
export interface teamsValuesSumIntoObj { [key: string]: number}
export interface paramForObjGenerator {
  totalMatches: teamMatches[],
  totalVictories: teamsValuesSumIntoObj,
  totalDefeats: teamsValuesSumIntoObj,
  goalsReceivedd: teamsValuesSumIntoObj,
  goalsDonee: teamsValuesSumIntoObj,
}
