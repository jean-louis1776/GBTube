import { Router } from 'express';

import videoController from '../controllers/video.controller.js';

const router = new Router();

router.post('/create', (...args) => videoController.upload(...args));
router.put('/', /*edit*/);
router.get('/download/:videoName', (...args) => videoController.download(...args));
router.get('/', /*getAll*/ );
router.delete('/:id', /*removeById*/)

export default router;
