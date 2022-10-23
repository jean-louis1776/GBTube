import {config} from '../config/db.config';
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
import {ChannelSubscriber} from "./ChannelSubscribers";
import {PlayList} from "./PlayList";
import {Comment} from "./Comment";
import {Answer} from "./Answer";
import {AnswerLike} from "./AnswerLike";
import {CommentLike} from "./CommentLike";
import {VideoLike} from "./VideoLike";

//Связи для таблицы Пользователей
User.hasOne(UserInfo, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
UserInfo.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(Token, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Token.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasMany(Channel, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Channel.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasMany(ChannelSubscriber, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
ChannelSubscriber.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasMany(Comment, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Comment.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasMany(Answer, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Answer.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasMany(AnswerLike, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
AnswerLike.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasMany(CommentLike, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
CommentLike.belongsTo(User, {
  foreignKey: 'userId'
});
User.hasMany(VideoLike, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
VideoLike.belongsTo(User, {
  foreignKey: 'userId'
});
//Связи для таблицы Каналов
Channel.hasOne(ChannelInfo, {
  foreignKey: {
    name: 'сhannelId',
    allowNull: false,
  },
});
ChannelInfo.belongsTo(Channel, {
  foreignKey: 'сhannelId'
});
Channel.hasMany(ChannelSubscriber, {
  foreignKey: {
    name: 'сhannelId',
    allowNull: false,
  },
});
ChannelSubscriber.belongsTo(Channel, {
  foreignKey: 'сhannelId'
});
Channel.hasMany(Video, {
  foreignKey: {
    name: 'сhannelId',
    allowNull: false,
  },
});
Video.belongsTo(Channel, {
  foreignKey: 'сhannelId'
});
Channel.hasMany(PlayList, {
  foreignKey: {
    name: 'сhannelId',
    allowNull: false,
  },
});
PlayList.belongsTo(Channel, {
  foreignKey: 'сhannelId'
});
//Связи для таблицы Видео
Video.hasMany(Comment, {
  foreignKey: {
    name: 'videoId',
    allowNull: false,
  },
});
Comment.belongsTo(Video, {
  foreignKey: 'videoId'
});
Video.hasMany(AnswerLike, {
  foreignKey: {
    name: 'videoId',
    allowNull: false,
  },
});
AnswerLike.belongsTo(Video, {
  foreignKey: 'videoId'
});
Video.hasMany(CommentLike, {
  foreignKey: {
    name: 'videoId',
    allowNull: false,
  },
});
CommentLike.belongsTo(Video, {
  foreignKey: 'videoId'
});
Video.hasMany(VideoLike, {
  foreignKey: {
    name: 'videoId',
    allowNull: false,
  },
});
VideoLike.belongsTo(Video, {
  foreignKey: 'videoId'
});
//Связи для таблицы Коментариев
Comment.hasMany(Answer, {
  foreignKey: {
    name: 'сommentId',
    allowNull: false,
  },
});
Answer.belongsTo(Comment, {
  foreignKey: 'сommentId'
});

export const runDB = async function () {
  try {
    await sequelize.authenticate();
    // await sequelize.sync()
    await sequelize.sync({force: true});
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


