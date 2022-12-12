import { Router } from 'express';
import channelController from '../controllers/channel.controller';
import channelValidation from '../validation/channel.validation';

const router = new Router();

router.post('/create', channelValidation.create, channelController.create);
router.patch('/edit', channelValidation.edit, channelController.edit);
router.patch('/subscribe', channelValidation.subscribeOrLike, channelController.subscribe);
router.delete('/:id', channelValidation.checkId, channelController.remove)
router.get('/get_one', channelValidation.getOne, channelController.getOne);
router.get('/get_all/:user_id', channelValidation.checkUserId, channelController.getAllChannelsOfUser);
router.get('/subscribes_list/:user_id', channelValidation.checkUserId, channelController.getSubscribedList);

export default router;
