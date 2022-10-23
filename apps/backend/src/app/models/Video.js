import {DataTypes} from 'sequelize';
import {sequelize} from "../config/db";

export const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  }, {
    timestamps: false,
  }
);
