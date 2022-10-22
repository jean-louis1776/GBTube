import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const Answer = sequelize.define('Answer', {
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
