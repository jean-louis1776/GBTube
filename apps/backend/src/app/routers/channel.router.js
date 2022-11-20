import { Router } from 'express';
import channelController from '../controllers/channel.controller';
import channelValidation from '../validation/channel.validation';

const router = new Router();

router.post('/create', channelValidation.create, channelController.create);
router.patch('/edit', channelController.edit);
router.patch('/subscribe', channelController.subscribe);
router.delete('/:id', channelController.remove)
router.get('/get_one/:id', channelController.getOne);
router.get('/get_all/:user_id', channelController.getAllChannelsOfUser);

export default router;
