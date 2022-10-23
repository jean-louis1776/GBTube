import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const ChannelInfo = sequelize.define('ChannelInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR,
    },
    description: {
      type: DataTypes.CHAR,
    },
  }, {
    timestamps: true,
    createdAt: false,
    updatedAt: 'updateTimestamp',
  }
);
