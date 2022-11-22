import { Router } from 'express';

import videoController from '../controllers/video.controller.js';
import videoValidation from '../validation/video.validation.js';

const router = new Router();

router.post('/create', videoValidation.create, videoController.create);
router.get('/download/:id', videoValidation.checkId, videoController.download);
router.get('/frameshot/:id', videoValidation.checkId, videoController.getFrameShot);
router.get('/get_one/:id', videoValidation.checkId, videoController.getVideoInfoById);
router.get('/get_all/:playlist_id', videoValidation.checkPlaylistId, videoController.getVideosInfoByPlaylistId);
router.patch('/', /*edit*/);
router.get('/', /*getAll*/ );
router.delete('/:id', /*removeById*/)

export default router;
