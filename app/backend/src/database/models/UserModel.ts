import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
    field: 'username',
  },
  role: {
    type: STRING,
    allowNull: false,
    field: 'role',
  },
  email: {
    type: STRING,
    allowNull: false,
    field: 'email',
  },
  password: {
    type: STRING,
    allowNull: false,
    field: 'password',
  },
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default UserModel;
