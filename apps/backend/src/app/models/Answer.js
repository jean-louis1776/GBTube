import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    commentID: {
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
