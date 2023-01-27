import leaderBoardObj, { LeaderBoardReturn, paramForObjGenerator,
  teamMatches } from '../../interfaces/leaderBoard.interface';

export function nameNormalizer(name: string) {
  const lower = name.toLocaleLowerCase();
  const removeSpace = lower.replace(' ', '');
  const removeSlash = removeSpace.replace('/', '');
  const removeDash = removeSlash.replace('-', '');
  const normalized = removeDash.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return normalized;
}

export function defeats(param: LeaderBoardReturn[]) {
  const list: { defeat: number, teamName: string }[] = [];
  param.forEach(({ teamName, matchModel: { homeTeamGoals, awayTeamGoals } }) => {
    let defeat = 0;
    if (homeTeamGoals < awayTeamGoals) {
      defeat += 1;
    }
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

export function victories(param: LeaderBoardReturn[]) {
  const list: { victory: number, teamName: string }[] = [];
  param.forEach(({ teamName, matchModel: { homeTeamGoals, awayTeamGoals } }) => {
    let victory = 0;
    if (homeTeamGoals > awayTeamGoals) {
      victory += 1;
    }
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

export function howManyGames(param: LeaderBoardReturn[]): teamMatches[] {
  let count = 0;
  let oldName = '';
  const list: { matches: number, homeTeam: string }[] = [];
  param.forEach((item) => {
    if (item.teamName !== oldName) {
      list.push({ matches: count, homeTeam: oldName });
      count = 0;
      oldName = item.teamName;
    }
    count += 1;
  });
  list.splice(0, 1);
  return list;
}

export function goalsReceived(list: LeaderBoardReturn[]) {
  const listWithMatchInfo = list
    .map(({ teamName, matchModel: { awayTeamGoals } }) => ({ teamName, awayTeamGoals }));

  const goalsTaken: { [key: string]: number } = {};

  listWithMatchInfo.forEach((game) => {
    const { teamName, awayTeamGoals } = game;
    const smallName = nameNormalizer(teamName);
    if (nameNormalizer(teamName) in goalsTaken) {
      goalsTaken[smallName] += awayTeamGoals;
    } else { goalsTaken[smallName] = awayTeamGoals; }
  });
  return goalsTaken;
}

export function goalsDone(list: LeaderBoardReturn[]) {
  const listWithMatchInfo = list
    .map(({ teamName, matchModel: { homeTeamGoals } }) => ({ teamName, homeTeamGoals }));

  const goalsDonee: { [key: string]: number } = {};

  listWithMatchInfo.forEach((game) => {
    const { teamName, homeTeamGoals } = game;
    const smallName = nameNormalizer(teamName);
    if (nameNormalizer(teamName) in goalsDonee) {
      goalsDonee[smallName] += homeTeamGoals;
    } else { goalsDonee[smallName] = homeTeamGoals; }
  });
  return goalsDonee;
}

export function calculateEfficiency(victory: number, matches: number, draw: number) {
  const points = (victory * 3) + draw;
  return ((points * 100) / (matches * 3)).toFixed(2);
}

export function objGeneratorForLeaderBoards(param: paramForObjGenerator): leaderBoardObj[] {
  const { goalsDonee, goalsReceivedd, totalDefeats, totalMatches, totalVictories } = param;
  return totalMatches.map((item) => {
    const teamNameKey = nameNormalizer(item.homeTeam);
    const findVic = totalVictories[teamNameKey];
    const findDef = totalDefeats[teamNameKey];
    return {
      name: item.homeTeam,
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
