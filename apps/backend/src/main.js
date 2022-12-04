import express from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

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
app.use(fileUpload({ useTempFiles : true }));
app.use('/api', router);
app.all('*', (req, res) => res.redirect(`${process.env.CLIENT_URL}/404NotFound`)); // if nonexistent method-URL pair

app.use(apiErrorMiddleware);         //!!!!!! Эта строка ОБЯЗАТЕЛЬНО должна быть ПОСЛЕДНИМ app.use()


(async () => {
  try {
    await runDB();
    setInterval(removeDeadTokens, 60 * 60 * 24 * 1000);
    app.listen(PORT, () => {
      console.log(`Api server has been started at http://localhost:${PORT}/api...`);
    });
  } catch(e) {
    console.log(e);
  }
})();
