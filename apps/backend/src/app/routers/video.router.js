import { Router } from 'express';

import videoController from '../controllers/video.controller.js';

const router = new Router();

router.post('/create', videoController.create);
router.get('/download/:id', videoController.download);
router.get('/frameshot/:id', videoController.getFrameShot);
router.patch('/', /*edit*/);
router.get('/', /*getAll*/ );
router.delete('/:id', /*removeById*/)

export default router;
