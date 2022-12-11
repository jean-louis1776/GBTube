import { Router } from 'express';

import videoController from '../controllers/video.controller.js';
import videoValidation from '../validation/video.validation.js';

const router = new Router();

router.post('/create', videoValidation.create, videoController.create);
router.get('/history/:user_id', videoValidation.checkUserId, videoController.findHistory);
router.get('/get_name/:id', videoValidation.checkId, videoController.getHashName);
router.get('/download', videoValidation.checkDownload, videoController.download);
router.get('/frameshot/:hash_name', videoValidation.checkName, videoController.getFrameShot);
router.get('/get_one', videoValidation.getOne, videoController.getVideoInfoById);
router.get('/query/:title', videoValidation.checkTitle, videoController.findVideoByPartName);
router.get('/get_all/:playlist_id', videoValidation.checkPlaylistId, videoController.getVideosInfoByPlaylistId);
router.get('/get_favorite', videoController.getFavoriteIdList);
router.get('/likes_list/:user_id', videoValidation.checkUserId, videoController.getLikesList)
router.patch('/like', videoValidation.subscribeOrLike, videoController.like);
router.patch('/dislike', videoValidation.subscribeOrLike, videoController.dislike);
router.patch('/edit', videoValidation.edit, videoController.edit);
router.delete('/:id', videoValidation.checkId, videoController.remove);

export default router;
