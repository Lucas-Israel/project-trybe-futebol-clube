import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import {
  dataValues,
  correctLogin,
  wrongEmailKeyName,
  wrongKeyNameReturn,
  emptyEmail,
  wrongPasswordKeyname,
  emptyPassword
} from './utils/loginVariables';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota login', () => {
  afterEach(sinon.restore);

  it('Login feito com sucesso, se passado tudo correto', async () => {

    sinon.stub(UserModel, 'findOne').resolves(dataValues as Model);
    const login = await chai.request(app).post('/login').send(correctLogin);

    expect(login.status).to.be.equal(200);
    expect(login.body).to.have.property('token');
  });

  it('Não é possivel logar sem email ou sem o campo de email correto', async () => {
    const login = await chai.request(app).post('/login').send(wrongEmailKeyName);
    expect(login.status).to.be.equal(400);
    expect(login.body).to.be.deep.equal(wrongKeyNameReturn);

    const login2 = await chai.request(app).post('/login').send(emptyEmail);
    expect(login2.status).to.be.equal(400);
    expect(login2.body).to.be.deep.equal(wrongKeyNameReturn);
  })

  it('Não é possivel logar sem senha ou sem o campo de senha correto', async () => {
    const login = await chai.request(app).post('/login').send(wrongPasswordKeyname);
    expect(login.status).to.be.equal(400);
    expect(login.body).to.be.deep.equal(wrongKeyNameReturn)

    const login2 = await chai.request(app).post('/login').send(emptyPassword);
    expect(login2.status).to.be.equal(400);
    expect(login2.body).to.be.deep.equal(wrongKeyNameReturn);
  })
});
