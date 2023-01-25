import bcrypt = require('bcryptjs');
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import {
  IUserLogin,
  IUserResultError,
  IUserResultToken,
} from '../interfaces/User.Interfaces';
import UserModel from '../database/models/UserModel';
import CRUD from '../interfaces/Services.interface';

const secret = process.env.JWT_SECRET || '';

export default class UserService {
  constructor(private _model: CRUD<UserModel>) {}

  async findOne(user: IUserLogin): Promise<IUserResultToken | IUserResultError> {
    const { email, password } = user;

    const result = await this._model.findOne({ where: { email } });

    const message = { message: 'Incorrect email or password' };

    if (result === null) return { status: 401, message };

    const pWCheck = await bcrypt.compare(password, result.dataValues.password);

    if (pWCheck === false) return { status: 401, message };

    delete result.dataValues.id;
    delete result.dataValues.password;

    const token = jwt
      .sign({ ...result.dataValues }, secret, { algorithm: 'HS256', expiresIn: '7d' });

    return { status: 200, message: { token } };
  }
}
