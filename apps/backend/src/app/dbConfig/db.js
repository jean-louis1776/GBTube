import {config} from './db.config';
import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});
