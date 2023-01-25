import { Model, INTEGER, BOOLEAN } from 'sequelize';
import TeamModel from './TeamModel';
import db from '.';

class MatchModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
});

TeamModel.belongsTo(MatchModel, { foreignKey: 'id' });

MatchModel.hasMany(TeamModel, { sourceKey: 'homeTeamId', foreignKey: 'id', as: 'homeTeam' });
MatchModel.hasMany(TeamModel, { sourceKey: 'awayTeamId', foreignKey: 'id', as: 'awayTeam' });

export default MatchModel;
