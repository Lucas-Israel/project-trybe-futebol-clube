import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import { IUserComplete } from '../interfaces/User.Interfaces';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY3NDMzMTMxNywiZXhwIjoxNjc0OTM2MTE3fQ.CO3m5r-LSGNskGJfctmGQivV70SPPhje-_5EVQNECxE'

const correctLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const dataValues = {
  dataValues: {
    id: 1,
    username: 'Admin',
    email: 'admin@admin.com',
    role: 'admin',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }
}

const wrongEmailKeyName = {
  emails: 'bbb@bbb.com',
  password: 'bbbbbbb'
}

const wrongEmailKeyNameReturn = {
  message: "All fields must be filled" 
}


describe('Testando a rota login', () => {
  afterEach(sinon.restore);

  it('Login feito com sucesso, se passado tudo correto', async () => {

    sinon.stub(UserModel, 'findOne').resolves(dataValues as Model)
    const login = await chai.request(app).post('/login').send(correctLogin);

    expect(login.status).to.be.equal(200);
    expect(login.body).to.have.property('token');
  });

  it('Não é possivel logar sem email', async () => {
    const login = await chai.request(app).post('/login').send(wrongEmailKeyName)

    expect(login.status).to.be.equal(400);
    expect(login.body).to.be.deep.equal(wrongEmailKeyNameReturn);
  })
});
