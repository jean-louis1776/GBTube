import { DataTypes } from 'sequelize';
import { sequelize } from "../dbConfig/db";

export const AnswerLike = sequelize.define('AnswerLikes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    liked: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: false,
  }
);
