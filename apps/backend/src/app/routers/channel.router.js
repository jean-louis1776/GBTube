import { Router } from 'express';
import channelController from '../controllers/channel.controller';
import channelValidation from '../validation/channel.validation';

const router = new Router();

router.post('/create', channelValidation.create, channelController.create);
router.patch('/edit', channelValidation.edit, channelController.edit);
router.patch('/subscribe', channelValidation.subscribe, channelController.subscribe);
router.delete('/:id', channelValidation.checkId, channelController.remove)
router.get('/get_one/:id', channelValidation.checkId, channelController.getOne);
router.get('/get_all/:user_id', channelValidation.checkUser_id, channelController.getAllChannelsOfUser);

export default router;
