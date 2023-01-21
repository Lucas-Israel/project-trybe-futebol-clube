import bcrypt = require('bcryptjs');
import { IUserLogin, IUserResult, IUserResultError } from '../interfaces/User.Interfaces';
import UserModel from '../database/models/UserModel';

// export default async function create(user: IUserComplete): Promise<IUserResult> {
//   const { dataValues } = await UserModel.create({ ...user });
//   delete dataValues.password;
//   const send = { status: 201, message: dataValues };
//   console.log(send);

//   return send;
// }

// const content = { username: 'abc', password: 'abc', email: 'abc@def.com', role: 'admin' };

// async function aaaa() { await create(content); }

// aaaa();

export default async function findOne(user: IUserLogin): Promise<IUserResult | IUserResultError> {
  const { username, password } = user;
  const result = await UserModel.findOne({ where: { username } });

  if (result === null) return { status: 404, message: 'Não encontrado' };

  const pWCheck = await bcrypt.compare(password, result.dataValues.password);
  if (pWCheck === false) return { status: 404, message: 'Credenciais invalidas' };

  delete result.dataValues.password;
  return { status: 200, message: result.dataValues };
}

// const content = { username: 'Admins', password: 'secret_admins' };

// async function aaaa() { console.log(await findOne(content)); }

// aaaa();
