import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    path: {
      type: DataTypes.CHAR,
    },
    shortDescription: {
      type: DataTypes.TEXT,
    },
    fullDescription: {
      type: DataTypes.TEXT,
    },
    likesCount: {
      type: DataTypes.INTEGER,
    },
    dislikesCount: {
      type: DataTypes.INTEGER,
    },
  }, {}
);
