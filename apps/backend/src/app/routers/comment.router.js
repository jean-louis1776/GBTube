import { Router } from 'express';
import commentValidation from "../validation/comment.validation";
import commentController from "../controllers/comment.controller";

const router = new Router();

router.post('/create', commentValidation.create, commentController.create);
router.patch('/edit', commentValidation.edit, commentController.edit);
router.delete('/:id', commentValidation.checkId, commentController.remove);
router.get('/id/:id', commentValidation.checkId, commentController.getOne);
router.get('/videoId/:videoId', commentValidation.getAllCommentsVideo, commentController.getAllCommentsVideo);
router.patch('/like', commentValidation.subscribeOrLike, commentController.like);
router.patch('/dislike', commentValidation.subscribeOrLike, commentController.dislike);

export default router;
