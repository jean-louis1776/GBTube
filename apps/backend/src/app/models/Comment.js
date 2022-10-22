import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    textInfo: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  }, {}
);
