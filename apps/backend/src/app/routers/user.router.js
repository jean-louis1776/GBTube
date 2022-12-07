import { Router } from 'express';

import userController from '../controllers/user.controller.js'
import userValidation from '../validation/user.validation.js';
//import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = new Router();

router.post('/registration', userValidation.create, (...args) => userController.create(...args));
router.post('/login', userValidation.login, (...args) => userController.login(...args));
router.post('/logout', userValidation.logout, userController.logout);
router.post('/avatar/:id', userValidation.checkId, userController.uploadAvatar);
router.patch('/edit/:id', userValidation.edit, userController.edit);
router.patch('/change_password', userValidation.changePassword, userController.changePassword)
router.get('/activate/:link', userValidation.checkLink, userController.activate);
router.get('/refresh', userValidation.refresh, (...args) =>userController.refresh(...args));
router.get('/avatar/:id', userValidation.checkId, userController.downloadAvatar);
router.get('/', userController.getAll);
router.get('/find/:id', userValidation.checkId, userController.getOneById);
router.get('/find_min/:id', userValidation.checkId, userController.getNickNameById)
router.get('/check', userValidation.checkUnique, userController.checkUnique);
router.delete('/:id', userValidation.checkId, userController.remove);
router.delete('/avatar/:id', userValidation.checkId, userController.removeAvatar);

export default router;
