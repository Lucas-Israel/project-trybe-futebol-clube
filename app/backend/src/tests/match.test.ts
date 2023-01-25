import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { queryReturn, queryReturnInProgress } from './utils/matchVariables';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /matches', () => {
  it('Retorna uma lista com informações das partidas ao acessar a rota GET /matches ', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(queryReturn as any);
    const result = await chai.request(app).get('/matches')

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(queryReturn);
    sinon.restore();
  })

  it('Retorna uma lista com informações das partidas em andamento ao acessar a rota GET /matches', async () => {
    // sinon.stub(MatchModel, 'findAllInProgress').resolves(queryReturnInProgress as any);
    const result = await chai.request(app).get('/matches/matches?inProgress=true');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(queryReturnInProgress);
  })
})