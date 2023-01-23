import bcrypt = require('bcryptjs');
import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import {
  IUserLogin,
  // IUserResult,
  IUserResultError,
  // IUserComplete,
  IUserResultToken,
} from '../interfaces/User.Interfaces';
import UserModel from '../database/models/UserModel';

const secrect = process.env.JWT_SECRET || '';

// export async function create(user: IUserComplete): Promise<IUserResult> {
//   const { dataValues } = await UserModel.create({ ...user });
//   delete dataValues.password;
//   const send = { status: 201, message: dataValues };

//   return send;
// }

// export async function findOne(user: IUserLogin): Promise<IUserResultToken | IUserResultError> {
//   const { email, password } = user;

//   const result = await UserModel.findOne({ where: { email } });

//   const message = {
//     message: 'Incorrect email or password',
//   };

//   if (result === null) return { status: 401, message };

//   const pWCheck = await bcrypt.compare(password, result.dataValues.password);
//   if (pWCheck === false) return { status: 401, message };

//   delete result.dataValues.id;

//   const token = jwt.sign({ ...result }, secrect, { algorithm: 'HS256', expiresIn: '7d' });

//   return { status: 200, message: { token } };
// }

export default class UserService {
  private _dataBaseModel: UserModel;
  constructor(dataBaseModel: UserModel) {
    this._dataBaseModel = dataBaseModel;
  }

  static async findOne(user: IUserLogin): Promise<IUserResultToken | IUserResultError> {
    const { email, password } = user;

    const result = await UserModel.findOne({ where: { email } });

    const message = {
      message: 'Incorrect email or password',
    };

    if (result === null) return { status: 401, message };

    const pWCheck = await bcrypt.compare(password, result.dataValues.password);
    if (pWCheck === false) return { status: 401, message };

    delete result.dataValues.id;

    const token = jwt.sign({ ...result }, secrect, { algorithm: 'HS256', expiresIn: '7d' });

    return { status: 200, message: { token } };
  }
}
