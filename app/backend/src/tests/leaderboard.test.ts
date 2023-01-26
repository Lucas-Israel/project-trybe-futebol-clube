import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const expectedReturnForFilteringHomeTeam = [
  {
    name: "Santos",
    totalPoints: 9,
    totalGames: 3,
    totalVictories: 3,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 9,
    goalsOwn: 3,
    goalsBalance: 6,
    efficiency: 100.00
  },
  {
    name: "Palmeiras",
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 10,
    goalsOwn: 5,
    goalsBalance: 5,
    efficiency: 77.78
  },
]

describe('Testando a rota /leaderboard', () => {
  it('É possivel filtrar a classificação dos times na rota /leaderboard/home', async () => {
    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(expectedReturnForFilteringHomeTeam);
  })
})