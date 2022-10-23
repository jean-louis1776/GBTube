import {DataTypes} from 'sequelize';
import {sequelize} from "../config/db";

export const VideoLike = sequelize.define('VideoLikes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: false,
  }
);
