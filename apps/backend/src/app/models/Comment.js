import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    videoID: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    textInfo: {
      type: DataTypes.CHAR,
    },
  }, {}
);
