import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const ChannelInfo = sequelize.define('ChannelInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    textInfo: {
      type: DataTypes.CHAR,
    },
    isSubscribed: {
      type: DataTypes.BOOLEAN,
    },
  }, {}
);
