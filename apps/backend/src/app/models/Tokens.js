import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const Token = sequelize.define('Token', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  }, {
  timestamps: true,
  createdAt: 'createdTimestamp',
  updatedAt: 'updateTimestamp',
  }
);
