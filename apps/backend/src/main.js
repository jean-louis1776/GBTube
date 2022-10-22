import * as express from 'express';
// import { Sequelize } from 'sequelize';
// import { sequelize } from "./app/models";
import {runDB} from "./app/models";

const app = express();

// const sequelize = new Sequelize('host1847338_tube', 'host1847338_gdtube', 'gdtube_2022', {
//   host: 'mysql79.hostland.ru',
//   dialect: 'mysql'
// });
runDB();



app.get('/api', (req, res) => {

  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
