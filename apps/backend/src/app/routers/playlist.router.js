import { Router } from 'express';

import playlistController from '../controllers/playlist.controller';

const router = new Router();

router.post('/create', playlistController.create);
router.patch('/edit', playlistController.edit);
router.delete('/:id', playlistController.remove)
router.get('/get_one/:id', playlistController.getOne);
router.get('/get_all/:channel_id', playlistController.getAllOfChannel);

export default router;
