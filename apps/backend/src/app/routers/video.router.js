import { Router } from 'express';

import videoController from '../controllers/video.controller.js';

const router = new Router();

router.post('/upload', videoController.upload);
router.put('/', /*edit*/);
router.get('/:id', /*download*/ );
router.get('/', /*getAll*/ );
router.delete('/:id', /*removeById*/)

export default router;
