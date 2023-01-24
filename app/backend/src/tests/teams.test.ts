import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
// import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

const findByPKReturn = {id: 1, teamName: 'Avaí/Kindermann'}

describe('Testando a rota /teams', () => {
  it('Retorna uma lista dos times, happy case', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as [])
    const connect = await chai.request(app).get('/teams')
    
    expect(connect.status).to.be.equal(200);
    expect(connect.body).to.be.deep.equal(teams);
    sinon.restore();
  })

  it('Retorna o time correto ao procurar com um ID em /teams/:id', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(findByPKReturn as any);
    const connect = await chai.request(app).get('/teams/1');

    expect(connect.status).to.be.equal(200);
    expect(connect.body).to.be.deep.equal(findByPKReturn)
  })
})
