import { Router } from 'express';

import userController from '../controllers/user.controller.js'

const router = new Router();

router.post('/registration', userController.create);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.put('/edit');

export default router;
