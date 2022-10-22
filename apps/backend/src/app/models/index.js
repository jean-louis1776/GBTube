import { config } from '../config/db.config';
import { Sequelize } from 'sequelize';

//TODO можно ли импортировать все функции из папки одним импортом
//Импортирование моделей
import {Users} from "./Users";
import {UserInfo} from "./UserInfo";
import {Token} from "./Tokens";
import {Video} from "./Video";
import {Channel} from "./Channel";
import {ChannelInfo} from "./ChannelInfo";
import {PlayList} from "./PlayList";
import {Comment} from "./Comment";
import {Answer} from "./Answer";


export const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect
});

const test = async function () {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

