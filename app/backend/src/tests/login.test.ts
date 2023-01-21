import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
const { before, after } = mocha

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(UserModel, "create")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
      } as UserModel);
  });

  after(()=>{
    (UserModel.create as sinon.SinonStub).restore();
  })

  it('teste do create', async () => {
    const user = await UserModel.create({username: 'Admin', role: 'admin', email: 'admin@admin.com'})
    
    expect(user).to.be.deep.equal({id: 1, username: 'Admin', role: 'admin', email: 'admin@admin.com'})
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
