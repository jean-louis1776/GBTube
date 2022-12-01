import { DataTypes } from 'sequelize';
import { sequelize } from "../dbConfig/db";

export const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
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
    idList: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    createdAt: 'createdTimestamp',
    updatedAt: 'updateTimestamp',
  },
);
