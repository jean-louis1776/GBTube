import {DataTypes} from 'sequelize';
import {sequelize} from "../config/db";

export const ChannelSubscriber = sequelize.define('ChannelSubscribers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    timestamps: false,
  }
);
