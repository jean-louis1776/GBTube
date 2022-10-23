import {DataTypes} from 'sequelize';
import {sequelize} from "../config/db";

export const Channel = sequelize.define('Channel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR,
    },
  }, {
    timestamps: false,
  }
);
