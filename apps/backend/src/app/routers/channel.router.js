import { Router } from 'express';
import channelController from '../controllers/channel.controller';

const router = new Router();

router.post('/create', channelController.create);
router.patch('/edit', channelController.edit);
router.patch('/subscribe', channelController.subscribe);
router.delete('/:id', channelController.remove)
router.get('/get_one/:id', channelController.getOne);
router.get('/get_all/:user_id', channelController.getAllChannelsOfUser);

export default router;
