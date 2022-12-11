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
      allowNull: true,
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
    thumbnail: {
      type: DataTypes.TEXT('medium'),
      allowNull: true,
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    createdAt: 'createTimestamp',
    updatedAt: false,
  },
);
