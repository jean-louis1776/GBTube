import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

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
