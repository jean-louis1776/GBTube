import {DataTypes} from 'sequelize';
import {sequelize} from "../dbConfig/db";

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
