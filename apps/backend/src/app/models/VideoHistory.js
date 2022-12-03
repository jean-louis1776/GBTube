import { DataTypes } from 'sequelize';
import { sequelize } from "../dbConfig/db";

export const VideoHistory = sequelize.define('VideoHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
  timestamps: true,
  createdAt: false,
  updatedAt: 'updatedTimestamp',
  },
);
