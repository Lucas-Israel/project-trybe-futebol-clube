import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
// const { before, after } = mocha

chai.use(chaiHttp);

const { expect } = chai;

const adminToken = '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'

describe('Testando a rota login', () => {
  // before(async () => {
  //   sinon
  //     .stub(UserModel, "create")
  //     .resolves({
  //       id: 1,
  //       username: 'Admin',
  //       role: 'admin',
  //       email: 'admin@admin.com',
  //     } as UserModel);
  // });

  // after(()=>{
  //   (UserModel.create as sinon.SinonStub).restore();
  // })

  afterEach(sinon.restore);

  it('Login feito com sucesso.', async () => {
    const login = await chai.request(app).post('/login').send({ user: 'Admin', password: adminToken});
    expect(login.status).to.be.equal(200);
    expect(login.body).to.be.deep.equal({message: adminToken});
  });

  // it('teste do create', async () => {
  //   const user = await UserModel.create({username: 'Admin', role: 'admin', email: 'admin@admin.com'})
    
  //   expect(user).to.be.deep.equal({id: 1, username: 'Admin', role: 'admin', email: 'admin@admin.com'})
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
