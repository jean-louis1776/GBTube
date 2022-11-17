import { Router } from 'express';

import videoController from '../controllers/video.controller.js';

const router = new Router();

router.post('/create', videoController.create);
router.get('/download/:id', videoController.download);
router.get('/frameshot/:id', videoController.getFrameShot);
router.get('/get_one/:id', videoController.getVideoInfoById);
router.get('/get_all/:playlist_id', videoController.getVideosInfoByPlaylistId);
router.patch('/', /*edit*/);
router.get('/', /*getAll*/ );
router.delete('/:id', /*removeById*/)

export default router;
