import { Model, INTEGER } from 'sequelize';
import TeamModel from './TeamModel';
import db from '.';

class MatchModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProggress: boolean;
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
  inProggress: {
    type: INTEGER,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  tableName: 'matches',
  timestamps: false,
});

MatchModel.hasMany(TeamModel, { foreignKey: 'id' });
MatchModel.hasMany(TeamModel, { foreignKey: 'id' });

TeamModel.belongsTo(MatchModel, { foreignKey: 'home_team_id' });
TeamModel.belongsTo(MatchModel, { foreignKey: 'away_team_id' });

export default MatchModel;
