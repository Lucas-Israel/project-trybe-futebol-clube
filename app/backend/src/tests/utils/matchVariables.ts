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
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7InVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9LCJfcHJldmlvdXNEYXRhVmFsdWVzIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJ1bmlxbm8iOjEsIl9jaGFuZ2VkIjp7fSwiX29wdGlvbnMiOnsiaXNOZXdSZWNvcmQiOmZhbHNlLCJfc2NoZW1hIjpudWxsLCJfc2NoZW1hRGVsaW1pdGVyIjoiIiwicmF3Ijp0cnVlLCJhdHRyaWJ1dGVzIjpbImlkIiwidXNlcm5hbWUiLCJyb2xlIiwiZW1haWwiLCJwYXNzd29yZCJdfSwiaXNOZXdSZWNvcmQiOmZhbHNlLCJpYXQiOjE2NzQ2NzQwMDcsImV4cCI6MTY3NTI3ODgwN30.KBhwcJOMkXIXfUw_hNO5CUuY1ZomUJx5SNL2PueB6LQ"
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
  awayTeamId: 99999999,
  awayTeamGoals: 0,
}