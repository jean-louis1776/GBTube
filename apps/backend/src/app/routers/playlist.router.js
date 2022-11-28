import { Router } from 'express';

import playlistController from '../controllers/playlist.controller';
import playlistValidation from '../validation/playlist.validation';

const router = new Router();

router.post('/create', playlistValidation.create, playlistController.create);
router.patch('/edit', playlistValidation.edit, playlistController.edit);
router.delete('/:id', playlistValidation.checkId, playlistController.remove)
router.get('/get_one/:id', playlistValidation.checkId, playlistController.getOne);
router.get('/get_all/:channel_id', playlistValidation.checkChannel_id, playlistController.getAllOfChannel);

export default router;
