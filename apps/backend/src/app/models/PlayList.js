import { DataTypes } from 'sequelize';
import { sequelize } from "../dbConfig/db";

export const PlayList = sequelize.define('PlayList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    textInfo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: false,
    updatedAt: 'updateTimestamp',
  }
);
