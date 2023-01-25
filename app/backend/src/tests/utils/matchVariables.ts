export const queryReturn = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: 0,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: 0,
    homeTeam: {
      teamName: "Internacional"
    },
    awayTeam: {
      teamName: "Santos"
    }
  }
]

export const queryReturnInProgress = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: 1,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: 1,
    homeTeam: {
      teamName: "Ferroviária"
    },
    awayTeam: {
      teamName: "Avaí/Kindermann"
    }
  }
]

export const resultQueryReturnInProgress = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: 1,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: 1,
    homeTeam: {
      teamName: "Ferroviária"
    },
    awayTeam: {
      teamName: "Avaí/Kindermann"
    }
  }
]

export const sendToCreateAMatch = {
  homeTeamId: 9,
  homeTeamGoals: 0,
  awayTeamId: 14,
  awayTeamGoals: 0,
}

export const createdMatch = {
  dataValues: {
    id: 49,
    homeTeamId: 9,
    homeTeamGoals: 0,
    awayTeamId: 14,
    awayTeamGoals: 0,
    inProgress: true,
  }
}

export const bodyForCreatedMatch = {
  id: 49,
  homeTeamId: 9,
  homeTeamGoals: 0,
  awayTeamId: 14,
  awayTeamGoals: 0,
  inProgress: true,
}

export const token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2NzQ2ODQyOTUsImV4cCI6MTY3NTI4OTA5NX0.n1L4LmP_5Usu7cQJ9Gj_fM4TEqAqIWwuZKnx0w_YTiM"
}

export const bodyForCreateAMatchWithTheSameTeamEachSide = {
  homeTeamId: 9,
  homeTeamGoals: 0,
  awayTeamId: 9,
  awayTeamGoals: 0,
}

export const invalidTeams = {
  homeTeamId: 99999999,
  homeTeamGoals: 0,
  awayTeamId: 999999998,
  awayTeamGoals: 0,
}