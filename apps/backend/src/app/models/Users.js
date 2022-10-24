import {DataTypes} from 'sequelize';
import {sequelize} from "../dbConfig/db";

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
