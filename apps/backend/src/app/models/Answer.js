import {DataTypes} from 'sequelize';
import {sequelize} from "../dbConfig/db";

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
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dislikesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    createdAt: 'createdTimestamp',
    updatedAt: 'updateTimestamp',
  }
);
