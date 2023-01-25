import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { queryReturn, queryReturnInProgress, createdMatch, token, sendToCreateAMatch, resultQueryReturnInProgress, bodyForCreatedMatch, bodyForCreateAMatchWithTheSameTeamEachSide, invalidTeams } from './utils/matchVariables';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import createMatchParams from '../interfaces/Services.interface'
import TeamModel from '../database/models/TeamModel';

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
    const result = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', token.token)
    .send(sendToCreateAMatch);

    expect(result.status).to.be.equal(201);
    expect(result.body).to.be.deep.equal(bodyForCreatedMatch);
    sinon.restore();
  })

  it('É possivel mudar o status inProgress para false pela rota PATCH /matches/:id/finish', async () => {
    sinon.stub(MatchModel, 'update').resolves([0]);
    const { status, body } = await chai.request(app).patch('/matches/49/finish');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ message: 'Finished'});
    sinon.restore();
  })

  it('Não é possivel criar uma partida com um time dos dois lados', async () => {
    const { status, body } = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', token.token)
    .send(bodyForCreateAMatchWithTheSameTeamEachSide);
    
    expect(status).to.be.equal(422);
    expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams'})
  })

  it('Não é possivel criar uma partida se não existir um time', async () => {
    const time1 = { id: 1, teamName: 'abc'};
    const stub = sinon.stub(TeamModel, 'findOne');
    stub.onCall(0).resolves(null as any);
    stub.onCall(1).resolves(time1 as any);
    const {status, body} = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', token.token)
    .send(invalidTeams);

    expect(status).to.be.equal(404);
    expect(body).to.be.deep.equal({message: 'There is no team with such id!'});
    sinon.restore();
  })

  it('É possivel atualizar partidas em andamento', async () => {
    const { status, body } = await chai
    .request(app)
    .patch('/matches/1')
    .set('Authorization', token.token)
    .send();

    expect(status).to.be.equal(200)
    expect(body).to.be.equal({ message: 'Method runtime complete!'})
  })
})