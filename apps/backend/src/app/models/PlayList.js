import { DataTypes } from 'sequelize';
import { sequelize } from "../dbConfig/db";

export const PlayList = sequelize.define('PlayList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
    createdAt: false,
    updatedAt: 'updateTimestamp',
  },
);
