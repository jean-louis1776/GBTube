import { DataTypes, where } from 'sequelize';
import { sequelize } from "../dbConfig/db";

//Импортирование моделей
import { User } from "./Users";
import { UserInfo } from "./UserInfo";
import { Token } from "./Tokens";
import { Video } from "./Video";
import { VideoInfo } from "./VideoInfo";
import { Channel } from "./Channel";
import { ChannelInfo } from "./ChannelInfo";
import { ChannelSubscriber } from "./ChannelSubscribers";
import { PlayList } from "./PlayList";
import { Comment } from "./Comment";
import { Answer } from "./Answer";
import { AnswerLike } from "./AnswerLike";
import { CommentLike } from "./CommentLike";
import { VideoLike } from "./VideoLike";
import { includes } from "core-js/internals/array-includes";
import excludeVariablesFromRoot from "@mui/material/styles/excludeVariablesFromRoot";


// //Связи для таблицы Пользователей
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
  foreignKey: 'userId',
});
User.hasMany(Channel, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Channel.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(ChannelSubscriber, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
ChannelSubscriber.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(Comment, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Comment.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(Answer, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Answer.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(AnswerLike, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
AnswerLike.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(CommentLike, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
CommentLike.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(VideoLike, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
VideoLike.belongsTo(User, {
  foreignKey: 'userId',
});
//Связи для таблицы Каналов
Channel.hasOne(ChannelInfo, {
  foreignKey: {
    name: 'channelId',
    allowNull: false,
  },
});
ChannelInfo.belongsTo(Channel, {
  foreignKey: 'channelId',
});
Channel.hasMany(ChannelSubscriber, {
  foreignKey: {
    name: 'channelId',
    allowNull: false,
  },
});
ChannelSubscriber.belongsTo(Channel, {
  foreignKey: 'channelId',
});
// Channel.hasMany(Video, {
//   foreignKey: {
//     name: 'channelId',
//     allowNull: false,
//   },
// });
// Video.belongsTo(Channel, {
//   foreignKey: 'channelId',
// });
Channel.hasMany(PlayList, {
  foreignKey: {
    name: 'channelId',
    allowNull: false,
  },
});
PlayList.belongsTo(Channel, {
  foreignKey: 'channelId',
});
//Связи плэйлиста
PlayList.hasMany(Video, {
  foreignKey: {
    name: 'playListId',
    allowNull: false,
  },
});
Video.belongsTo(PlayList, {
  foreignKey: {
    name: 'playListId',
  },
});
//Связи для таблицы Видео
Video.hasMany(Comment, {
  foreignKey: {
    name: 'videoId',
    allowNull: false,
  },
});
Comment.belongsTo(Video, {
  foreignKey: 'videoId',
});
Video.hasMany(VideoInfo, {
  foreignKey: {
    name: 'videoId',
    allowNull: false,
  },
});
VideoInfo.belongsTo(Video, {
  foreignKey: 'videoId',
});
Video.hasMany(VideoLike, {
  foreignKey: {
    name: 'videoId',
    allowNull: false,
  },
});
VideoLike.belongsTo(Video, {
  foreignKey: 'videoId',
});
//Связи для таблицы Коментариев
Comment.hasMany(CommentLike, {
  foreignKey: {
    name: 'commentId',
    allowNull: false,
  },
});
CommentLike.belongsTo(Comment, {
  foreignKey: 'commentId',
});
Comment.hasMany(Answer, {
  foreignKey: {
    name: 'commentId',
    allowNull: false,
  },
});
Answer.belongsTo(Comment, {
  foreignKey: 'commentId',
});
//Связи для таблицы Ответов
Answer.hasMany(AnswerLike, {
  foreignKey: {
    name: 'answerId',
    allowNull: false,
  },
});
AnswerLike.belongsTo(Answer, {
  foreignKey: 'answerId',
});

// import {channelQueries} from '../queries/ChannelQueries'
// import { playListQueries } from '../queries/PlayListQueries';


export const runDB = async function () {
  try {
    await sequelize.authenticate();

    // await sequelize.sync();
    // await sequelize.sync({force: true});
    // await UserInfo.sync({ alter: true });
    // await PlayList.sync({ alter: true });
    // await Answer.sync({ alter: true });
    // await Comment.sync({ alter: true });
    // await Video.sync({ alter: true });
    // await VideoInfo.sync({ alter: true });
    // await Channel.sync({ alter: true });
    // await ChannelInfo.sync({ alter: true });

    // const subscribers = (await ChannelInfo.findOne({where: {channelId: 16}}));
    // await subscribers.increment('subscribersCount', {by: 1});
    // console.log(subscribers);

    // playListQueries.createPlayList(18, 'что то тут будет', 'и тут что то будет');
    // const playList3 = playListQueries.findAllPlayList(18);
    // // const playList3 = (await PlayList.findAll({where: {channelId: 18}})).map((value, index, array) => {
    // //   return value.toJSON();
    // // })
    // //
    // // playList3.then(res => {
    // //   console.log(res)})
    // console.log(playList3);

    // channelQueries.subscriber(17, 1)
    // await Channel.create({title: 'MyChannel', userId: 1})
    // channelQueries.createChannel(1,"MyChannel2", 'lalalala');
    // const cUser = await User.create({
    //   nickName: 'Jenya9',
    // })
    // console.log(cUser.id);

    // const isCreate =  !!(await User.findOne({
    //     where: {
    //       nickName: 'Jenya10',
    //     },
    //   }))
    // console.log(isCreate);

    // const cUserInfo = await UserInfo.create({
    //   firstName: 'Jenya2',
    //   lastName: 'Pogorelov2',
    //   email: '1@4.3',
    //   password: '123456',
    //   userId: 2,
    // });
    // console.log(cUserInfo);

    // const allUsers = await User.findOne(
    //   {
    //
    //     where: {
    //       id: 2,
    //     },
    //     include: [
    //       {
    //         model: UserInfo,
    //         attributes: {
    //           exclude: ['isActivate']
    //         }
    //       },
    //
    //     ],
    //   },
    // );
    // // console.log(allUsers[0].dataValues);
    // // console.log(JSON.stringify(allUsers, null, 1));
    // const allUser = allUsers.toJSON()
    // console.log(allUser);


    // const uUser2 = function test(data) {
    //   return (User.update(
    //     {
    //       nickName: data.name,
    //     },
    //     {
    //       where: {
    //         Id: 4,
    //       },
    //     }
    //   ))
    // }
    // console.log(uUser2({}));

    // const uUser = await User.update(
    //   {
    //     nickName: 'John34',
    //   },
    //   {
    //     where: {
    //       Id: 5,
    //     },
    //   }
    // )
    // console.log(uUser);

    // console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
