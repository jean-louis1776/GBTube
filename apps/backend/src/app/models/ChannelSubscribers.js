import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

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
