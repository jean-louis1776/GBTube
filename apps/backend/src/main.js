import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';

import { router } from './app/routers/routers';
import { apiErrorMiddleware } from './app/middlewares/apiError.middleware';

import { runDB } from "./app/models";

dotenv.config();

const PORT = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(path.resolve(), 'apps', 'backend', 'src', 'assets', 'static')));
app.use(fileUpload({}));
app.use('/api', router);

app.use(apiErrorMiddleware);         //!!!!!! Эта строка ОБЯЗАТЕЛЬНО должна быть ПОСЛЕДНИМ app.use()

(async () => {
  try {
    await runDB();
    app.listen(PORT, () => {
      console.log(`Api server has been started at http://localhost:${PORT}/api...`);
    });
  } catch(e) {
    console.log(e);
  }
})();
