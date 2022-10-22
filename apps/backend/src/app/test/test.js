import {Sequelize} from 'sequelize';
import {sequelize} from "../models";

export const test = async function () {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

