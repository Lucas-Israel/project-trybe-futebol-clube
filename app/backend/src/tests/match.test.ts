import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { queryReturn, queryReturnInProgress, createdMatch, token, sendToCreateAMatch, resultQueryReturnInProgress, bodyForCreatedMatch } from './utils/matchVariables';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import createMatchParams from '../interfaces/Services.interface'

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
    expect(result.body).to.be.deep.equal(resultQueryReturnInProgress);
    sinon.restore()
  })

  it('É possivel criar uma partida na rota /matches', async () => {
    sinon.stub(MatchModel, 'create').resolves(createdMatch as Model)
    const result = await chai.request(app).post('/matches').send(sendToCreateAMatch);

    expect(result.status).to.be.equal(201);
    expect(result.body).to.be.deep.equal(bodyForCreatedMatch);
  })

  it('É possivel mudar o status inProgress para false pela rota PATCH /matches/:id/finish', async () => {
    const { status, body } = await chai.request(app).patch('/matches/49/finish')

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ message: 'Finished'})
  })

  // it('É apenas possivel registrar uma nova partida se o usuario tiver uma token', async () => {
  //   const result = await chai.request(app).post('/matches').set({Authorization: token })

  //   expect(result.status).to.be.equal(201);
  // })
})