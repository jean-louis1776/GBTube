import { Router } from 'express';

import userController from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = new Router();

router.get('/', authMiddleware, userController.getAll);
router.post('/registration', (...args) => userController.create(...args));
router.post('/login', (...args) => userController.login(...args));
router.post('/logout', authMiddleware, userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', (...args) =>userController.refresh(...args));
router.put('/edit');
router.delete('/delete/:id');

export default router;
