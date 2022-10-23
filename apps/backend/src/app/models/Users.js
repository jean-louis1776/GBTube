import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const User = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickName: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    }

  }, {
  timestamps: false,
  }
);
