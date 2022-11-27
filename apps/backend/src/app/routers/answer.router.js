import { Router } from 'express';
import answerController from "../controllers/answer.controller";
import answerValidation from "../validation/answer.validation";

const router = new Router();

router.post('/create', answerValidation.create, answerController.create);
router.patch('/edit', answerValidation.edit, answerController.edit);
router.delete('/:id', answerValidation.checkId, answerController.remove);
router.get('/:id', answerValidation.checkId, answerController.getOne);
router.get('/:commentId', answerValidation.checkId, answerController.getAllAnswerOfComment);
router.patch('/like', answerValidation.subscribeOrLike, answerController.like);
router.patch('/dislike', answerValidation.subscribeOrLike, answerController.dislike);


export default router;

