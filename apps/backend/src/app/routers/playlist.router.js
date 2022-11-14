import { Router } from 'express';

import playlistController from '../controllers/playlist.controller';

const router = new Router();

router.post('/create', playlistController.create);
router.patch('/edit', playlistController.edit);
router.delete('/:id', /*removeById*/)
router.get('/get_one/:id', playlistController.getOne);
router.get('/', /*getAll*/ );

export default router;
