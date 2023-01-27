import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { expectedReturnForFilteringHomeTeam, homeModel } from './utils/leaderboardVariables';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /leaderboard', () => {
  it('É possivel filtrar a classificação dos times na rota /leaderboard/home', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(homeModel as any)
    const { status, body } = await chai.request(app).get('/leaderboard/home');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(expectedReturnForFilteringHomeTeam);
  })
})