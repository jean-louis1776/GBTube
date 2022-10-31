import { DataTypes } from 'sequelize';
import { sequelize } from "../dbConfig/db";

export const VideoInfo = sequelize.define('VideoInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    path: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    hashName: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    description: {
      type: DataTypes.CHAR,
      allowNull: true,
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
    createdAt: false,
    updatedAt: 'updateTimestamp',
  },
);
