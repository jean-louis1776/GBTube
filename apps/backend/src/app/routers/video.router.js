import { Router } from 'express';

import videoController from '../controllers/video.controller.js';

const router = new Router();

router.post('/create', videoController.create);
router.patch('/', /*edit*/);
router.get('/download/:id', videoController.download);
router.get('/', /*getAll*/ );
router.delete('/:id', /*removeById*/)

export default router;
