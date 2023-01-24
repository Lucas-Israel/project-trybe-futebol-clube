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
  emptyPassword,
  token,
  role,
  emptyKeys,
  wrongPassword,
  incorrectEmailOrPasswordMessage,
  inexistentUser,
} from './utils/loginVariables';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota login', () => {
  it('Login feito com sucesso, se passado tudo correto', async () => {
    sinon.stub(UserModel, 'findOne').resolves(dataValues as Model)
    const login = await chai.request(app).post('/login').send(correctLogin);

    expect(login.status).to.be.equal(200);
    expect(login.body).to.have.property('token');
    sinon.restore()
  });

  it('Não é possivel fazer login sem email ou sem o campo de email correto', async () => {
    const login = await chai.request(app).post('/login').send(wrongEmailKeyName);
    expect(login.status).to.be.equal(400);
    expect(login.body).to.be.deep.equal(wrongKeyNameReturn);
    sinon.restore()
    
    const login2 = await chai.request(app).post('/login').send(emptyEmail);
    expect(login2.status).to.be.equal(400);
    expect(login2.body).to.be.deep.equal(wrongKeyNameReturn);
    sinon.restore()
  })

  it('Não é possivel fazer login sem senha ou sem o campo de senha correto', async () => {
    const login = await chai.request(app).post('/login').send(wrongPasswordKeyname);
    expect(login.status).to.be.equal(400);
    expect(login.body).to.be.deep.equal(wrongKeyNameReturn);
    sinon.restore()

    const login2 = await chai.request(app).post('/login').send(emptyPassword);
    expect(login2.status).to.be.equal(400);
    expect(login2.body).to.be.deep.equal(wrongKeyNameReturn);
    sinon.restore()
  })

  it('Não é possivel fazer login com nenhum dos campos com caracteres insuficientes', async () => {
    const login = await chai.request(app).post('/login').send(emptyKeys);
    expect(login.status).to.be.equal(400);
    expect(login.body).to.be.deep.equal(wrongKeyNameReturn);
    sinon.restore()
  })

  it('Não é possivel fazer login com um password inválido', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'abcdeer'
    });
    
    expect(login.status).to.be.equal(401);
    expect(login.body).to.be.deep.equal(incorrectEmailOrPasswordMessage);
    sinon.restore()
  })

  it('Não encontra o usuario com email não existente', async () => {
    const login = await chai.request(app).post('/login').send(inexistentUser);
    expect(login.status).to.be.equal(401);
    expect(login.body).to.be.deep.equal(incorrectEmailOrPasswordMessage)
    sinon.restore()
  })

  it('Na rota login/validate retorna o objeto correto se tiver um token válido', async () => {
    const auth = { Authorization: token }
    const login = await chai.request(app).get('/login/validate').set(auth);

    expect(login.status).to.be.equal(200);
    expect(login.body).to.be.deep.equal(role);
    sinon.restore()

    const login2 = await chai.request(app).get('/login/validate').set({ Authorizations: 'abc'});
    expect(login2.status).to.be.equal(404)
    sinon.restore()
  })
});
