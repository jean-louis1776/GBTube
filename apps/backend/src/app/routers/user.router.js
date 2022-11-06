import { Router } from 'express';

import userController from '../controllers/user.controller.js'
//import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = new Router();

router.post('/registration', (...args) => userController.create(...args));
router.post('/login', (...args) => userController.login(...args));
router.post('/logout', /*authMiddleware, */userController.logout);
router.post('/avatar/:id', userController.uploadAvatar);
router.put('/edit/:id', userController.edit);
router.get('/activate/:link', userController.activate);
router.get('/refresh', (...args) =>userController.refresh(...args));
router.get('/avatar/:id', /*userController.downloadAvatar*/);
router.get('/', /*authMiddleware, */userController.getAll);
router.get('/:id', userController.getOneById);
router.delete('/:id', userController.remove);

export default router;
