import leaderBoardObj, { awayTeamMatches, LeaderBoardReturn, paramForObjGenerator,
  teamMatches } from '../../interfaces/leaderBoard.interface';

export function nameNormalizer(name: string | undefined) {
  const namee = name || 'ABC';
  const lower = namee.toLocaleLowerCase();
  const removeSpace = lower.replace(' ', '');
  const removeSlash = removeSpace.replace('/', '');
  const removeDash = removeSlash.replace('-', '');
  const normalized = removeDash.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return normalized;
}

export function defeats(param: LeaderBoardReturn[], homeOrAway: 'home' | 'away') {
  const list: { defeat: number, teamName: string }[] = [];
  param.forEach(({ teamName, matchModel: { homeTeamGoals, awayTeamGoals } }) => {
    const condition = homeOrAway === 'home'
      ? homeTeamGoals < awayTeamGoals : awayTeamGoals < homeTeamGoals;
    let defeat = 0;
    if (condition) { defeat += 1; }
    list.push({ defeat, teamName });
  });
  const teamDefeats: { [key: string]: number } = {};

  list.forEach((game) => {
    const { teamName, defeat } = game;
    const smallName = nameNormalizer(teamName);
    if (nameNormalizer(teamName) in teamDefeats) {
      teamDefeats[smallName] += defeat;
    } else { teamDefeats[smallName] = defeat; }
  });
  return teamDefeats;
}

export function victories(param: LeaderBoardReturn[], homeOrAway: 'home' | 'away') {
  const list: { victory: number, teamName: string }[] = [];
  param.forEach(({ teamName, matchModel: { homeTeamGoals, awayTeamGoals } }) => {
    const condition = homeOrAway === 'home'
      ? homeTeamGoals > awayTeamGoals : awayTeamGoals > homeTeamGoals;
    let victory = 0;
    if (condition) { victory += 1; }
    list.push({ victory, teamName });
  });
  const teamVictories: { [key: string]: number } = {};

  list.forEach((game) => {
    const { teamName, victory } = game;
    const smallName = nameNormalizer(teamName);
    if (nameNormalizer(teamName) in teamVictories) {
      teamVictories[smallName] += victory;
    } else { teamVictories[smallName] = victory; }
  });
  return teamVictories;
}

export function howManyGames(
  param: LeaderBoardReturn[],
  homeOrAway: 'home' | 'away',
): (teamMatches | awayTeamMatches)[] {
  let count = 0;
  let oldName = '';
  const list: { [key: string]: string | number }[] = [];
  param.forEach((item) => {
    if (item.teamName !== oldName) {
      list.push({ matches: count, [`${homeOrAway}Team`]: oldName });
      count = 0;
      oldName = item.teamName;
    }
    count += 1;
  });
  list.splice(0, 1);

  return list as unknown as (teamMatches | awayTeamMatches)[];
}

export function goalsReceived(list: LeaderBoardReturn[], homeOrAway: 'home' | 'away') {
  const condition = homeOrAway === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';

  const goalsTaken: { [key: string]: number } = {};

  list.forEach((game) => {
    const smallName = nameNormalizer(game.teamName);
    if (nameNormalizer(game.teamName) in goalsTaken) {
      goalsTaken[smallName] += game.matchModel[condition];
    } else { goalsTaken[smallName] = game.matchModel[condition]; }
  });
  return goalsTaken;
}

export function goalsDone(list: LeaderBoardReturn[], homeOrAway: 'home' | 'away') {
  const condition = homeOrAway === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';

  const goalsDonee: { [key: string]: number } = {};

  list.forEach((game) => {
    const smallName = nameNormalizer(game.teamName);
    if (nameNormalizer(game.teamName) in goalsDonee) {
      goalsDonee[smallName] += game.matchModel[condition];
    } else { goalsDonee[smallName] = game.matchModel[condition]; }
  });
  return goalsDonee;
}

export function calculateEfficiency(victory: number, matches: number, draw: number) {
  const points = (victory * 3) + draw;
  return ((points * 100) / (matches * 3)).toFixed(2);
}

export function objGeneratorForLeaderBoards(param: paramForObjGenerator): leaderBoardObj[] {
  const { goalsDonee, goalsReceivedd, totalDefeats, totalMatches, totalVictories, hOa } = param;
  return totalMatches.map((item) => {
    const teamNameKey = nameNormalizer(hOa === 'home' ? item.homeTeam : item.awayTeam);
    const findVic = totalVictories[teamNameKey];
    const findDef = totalDefeats[teamNameKey];
    return {
      name: hOa === 'home' ? item.homeTeam : item.awayTeam,
      totalPoints: findVic * 3 + item.matches - (findVic + findDef),
      totalGames: item.matches,
      totalVictories: findVic,
      totalDraws: item.matches - (findVic + findDef),
      totalLosses: totalDefeats[teamNameKey],
      goalsFavor: goalsDonee[teamNameKey],
      goalsOwn: goalsReceivedd[teamNameKey],
      goalsBalance: goalsDonee[teamNameKey] - goalsReceivedd[teamNameKey],
      efficiency: calculateEfficiency(findVic, item.matches, item.matches - (findVic + findDef)),
    };
  });
}

export const toAdd = {
  teamName: 'aaaaaaaaaaaaaa',
  matchModel: {
    id: 999999,
    hometeamId: 9999999,
    homeTeamGoals: 99999999,
    awayTeamId: 888888,
    awayTeamGoals: 888888,
  },
};
