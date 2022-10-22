import { config } from '../config/db.config';
import {DataTypes, Sequelize} from 'sequelize';

export const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

//Импортирование моделей
import {User} from "./Users";
import {UserInfo} from "./UserInfo";
import {Token} from "./Tokens";
import {Video} from "./Video";
import {Channel} from "./Channel";
import {ChannelInfo} from "./ChannelInfo";
import {PlayList} from "./PlayList";
import {Comment} from "./Comment";
import {Answer} from "./Answer";

//Связи один а одному для таблицы Пользователей
User.hasOne(UserInfo);
User.hasOne(Token);
User.hasOne(Channel);
User.hasOne(Comment);
User.hasOne(Answer);
//Связи один а одному для таблицы Каналов
Channel.hasOne(ChannelInfo);
Channel.hasOne(Video);
Channel.hasOne(PlayList);
//Связи один а одному для таблицы Видео
Video.hasOne(Comment);
//Связи один а одному для таблицы Коментариев
Comment.hasOne(Answer);

export const runDB = async function () {
  try {
    await sequelize.authenticate();
    // await sequelize.sync()
    // await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


