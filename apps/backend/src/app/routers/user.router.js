import { Router } from 'express';

import userController from '../controllers/user.controller.js'
//import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = new Router();

router.post('/registration', (...args) => userController.create(...args));
router.post('/login', (...args) => userController.login(...args));
router.post('/logout', userController.logout);
router.post('/avatar/:id', userController.uploadAvatar);
router.patch('/edit/:id', userController.edit);
router.get('/activate/:link', userController.activate);
router.get('/refresh', (...args) =>userController.refresh(...args));
router.get('/avatar/:id', userController.downloadAvatar);
router.get('/', userController.getAll);
router.get('/find/:id', userController.getOneById);
router.get('/check', userController.checkUnique);
router.delete('/:id', userController.remove);
router.delete('/avatar/:id', userController.removeAvatar);

export default router;
