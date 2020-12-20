import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { checkAdmin } from '../midleware/adminCheck';

const router = express.Router();

router.get('/', CategoryController.getList);

router.put('/', checkAdmin, CategoryController.update);

router.post('/', checkAdmin, CategoryController.create);

export { router as categoryRouter };