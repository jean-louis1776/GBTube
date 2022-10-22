import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const PlayList = sequelize.define('PlayList', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    channelID: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    textInfo: {
      type: DataTypes.INTEGER,
    },
  }, {}
);
