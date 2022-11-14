import { Router } from 'express';

import userRouter from './user.router.js';
import channelRouter from './channel.router.js';
import playlistRouter from './playlist.router.js';
import videoRouter from './video.router.js';
import commentRouter from './comment.router.js';
import answerRouter from './answer.router.js';

export const router = new Router();


router.use('/user', userRouter);
router.use('/channel', channelRouter);
router.use('/playlist', playlistRouter);
router.use('/video', videoRouter);
router.use('/comment', commentRouter);
router.use('/answer', answerRouter);
