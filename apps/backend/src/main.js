import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
// import path from 'path';
import fileUpload from 'express-fileupload';
import PromiseFtp from 'promise-ftp';

import { router } from './app/routers/routers';
import { apiErrorMiddleware } from './app/middlewares/apiError.middleware';

import { runDB } from "./app/models";
import { removeDeadTokens } from './app/util/removeDeadTokens';

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use(express.json());
// app.use(express.static(path.resolve(path.resolve(), 'apps', 'backend', 'src', 'assets', 'static')));
app.use(fileUpload({ useTempFiles : true }));
app.use('/api', router);
app.all('*', (req, res) => res.redirect(process.env.CLIENT_URL)); // if nonexistent method-URL pair

app.use(apiErrorMiddleware);         //!!!!!! Эта строка ОБЯЗАТЕЛЬНО должна быть ПОСЛЕДНИМ app.use()

export const ftpServer = new PromiseFtp();   // Instance of remote ftp-server

(async () => {
  try {
    await ftpServer.connect({
      host: process.env.STORE_SERVER_HOST,
      port: process.env.STORE_SERVER_PORT,
      user: process.env.STORE_SERVER_USER,
      password: process.env.STORE_SERVER_PASSWORD
    });
    await ftpServer.cwd('/test');             // Sets the curent working directory of the FTP Server
    await runDB();
    setInterval(removeDeadTokens, 60 * 60 * 24 * 1000);
    app.listen(PORT, () => {
      console.log(`Api server has been started at http://localhost:${PORT}/api...`);
    });
  } catch(e) {
    console.log(e);
  }
})();
