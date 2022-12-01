import { DataTypes, where } from 'sequelize';
import { sequelize } from "../dbConfig/db";

export const Answer = sequelize.define('Answer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dislikesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    idList: {
      type: DataTypes.TEXT,
    },
  }, {
  hooks: {
    afterCreate: (answer) => {
      Answer.update({idList: `${answer.idList}_${answer.id}`}, {where: {id: answer.id}});
    }
  },
    timestamps: true,
    createdAt: 'createdTimestamp',
    updatedAt: 'updateTimestamp',
  },
);
