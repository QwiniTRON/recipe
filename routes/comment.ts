import express from 'express';
import { checkAdmin } from '../midleware/adminCheck';
import {CategoryController} from '../controllers/CommentController';

const router = express.Router();

router.post('/', CategoryController.create);

router.delete('/:id', checkAdmin,  CategoryController.delete);

export { router as commentRouter };