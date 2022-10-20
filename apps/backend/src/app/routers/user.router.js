import { Router } from 'express';

import userController from '../controllers/user.controller.js'

const router = new Router();

router.post('/registration', (...args) => userController.create(...args));
router.post('/login', (...args) => userController.login(...args));
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.put('/edit');

export default router;
