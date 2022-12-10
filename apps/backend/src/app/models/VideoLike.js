import { DataTypes } from 'sequelize';
import { sequelize } from "../dbConfig/db";

export const VideoLike = sequelize.define('VideoLikes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    liked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  }
);
