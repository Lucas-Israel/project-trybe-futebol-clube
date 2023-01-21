import bcrypt = require('bcryptjs');
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import {
  IUserLogin,
  IUserResult,
  IUserResultError,
  IUserComplete,
  IUserResultToken,
} from '../interfaces/User.Interfaces';
import UserModel from '../database/models/UserModel';

const secrect = 'jwt_secret';

export async function create(user: IUserComplete): Promise<IUserResult> {
  const { dataValues } = await UserModel.create({ ...user });
  delete dataValues.password;
  const send = { status: 201, message: dataValues };

  return send;
}

export async function findOne(user: IUserLogin): Promise<IUserResultToken | IUserResultError> {
  const { email, password } = user;

  const result = await UserModel.findOne({ where: { email } });

  if (result === null) return { status: 400, message: 'Incorrect email or password' };

  const pWCheck = await bcrypt.compare(password, result.dataValues.password);
  if (pWCheck === false) return { status: 400, message: 'Incorrect email or password' };

  delete result.dataValues.id;
  console.log(result.dataValues);

  const token = jwt.sign({ ...result }, secrect, { algorithm: 'HS256', expiresIn: '7d' });

  return { status: 200, message: { token } };
}

// const content = { email: 'admin@admin.com', password: 'secret_admin' };

// async function aaaa() { console.log(await findOne(content)); }

// aaaa();
