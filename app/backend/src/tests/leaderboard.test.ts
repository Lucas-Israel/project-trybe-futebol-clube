import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { expectedReturnForFilteringHomeTeam, firstSendToGeneralLeaderboard, generalLeaderboardResult, homeModel, resultForLeaderBoardAway, secondSendToGeneralLeaderboards, sendToLeaderboardAway } from './utils/leaderboardVariables';
import TeamModel from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /leaderboard', () => {
  it('É possivel filtrar a classificação dos times que jogam em casa na rota /leaderboard/home', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(homeModel as any)
    const { status, body } = await chai.request(app).get('/leaderboard/home');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(expectedReturnForFilteringHomeTeam);
    sinon.restore();
  })

  it('É possivel filtrar a classificação dos times que jogam fora de casa na rota /leaderboard/away', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(sendToLeaderboardAway as any)
    const { status, body} = await chai.request(app).get('/leaderboard/away');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(resultForLeaderBoardAway);
    sinon.restore();
  })

  it('É possivel filtrar a classificalçao geral dos times na rota /leaderboard', async () => {
    const stub = sinon.stub(TeamModel, 'findAll');
    stub.onCall(0).resolves(firstSendToGeneralLeaderboard as any);
    stub.onCall(1).resolves(secondSendToGeneralLeaderboards as any);
    const { status, body} = await chai.request(app).get('/leaderboard');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(generalLeaderboardResult);
    sinon.restore();
  })
})