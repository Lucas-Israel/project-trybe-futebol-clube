import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import { IUserComplete } from '../interfaces/User.Interfaces';

chai.use(chaiHttp);

const { expect } = chai;


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.

const envio = {
  username: 'Admin',
  password: 'secret_admin'
}

const retorno: IUserComplete =
{
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}


describe('Testando a rota login', () => {
  afterEach(sinon.restore);

  it('Login feito com sucesso, se passado tudo correto', async () => {
    sinon.stub(UserModel, 'findOne').resolves({ dataValues: retorno } as any)
    const login = await chai.request(app).post('/login').send(envio);
    // console.log('local: login test');
    // console.log(login.body);
    
    expect(login.status).to.be.equal(200);
    expect(login.body).to.be.deep.equal(retorno);
  });
});
