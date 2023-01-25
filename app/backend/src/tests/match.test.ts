import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { queryReturn, queryReturnInProgress, createdMatch, token, sendToCreateAMatch } from './utils/matchVariables';

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

  it('Retorna uma lista com informações das partidas em andamento ao acessar a rota GET /matches?inProgress=1', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(queryReturnInProgress as any);
    const result = await chai.request(app).get('/matches?inProgress=false');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(queryReturnInProgress);
    sinon.restore()
  })

  it('É possivel criar uma partida na rota /matches', async () => {
    const result = await chai.request(app).post('/matches').send(sendToCreateAMatch)

    expect(result.status).to.be.equal(201);
    expect(result.body).to.be.deep.equal(createdMatch)
  })

  // it('É apenas possivel registrar uma nova partida se o usuario tiver uma token', async () => {
  //   const result = await chai.request(app).post('/matches').set({Authorization: token })

  //   expect(result.status).to.be.equal(201);
  // })
})