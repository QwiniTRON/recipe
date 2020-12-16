import express from 'express';
import fs from 'fs';
import { upload } from '../midleware/multerConfig';
import { recipeValidator } from '../utils/validators';
import { validationResult } from 'express-validator';
import path from 'path';
import {
  getCategoryes,
  Category,
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  createCommentToRecipe,
  deleteComment,
  deleteRecipe,
  getShortRecipeById,
  ShortRecipe,
  editRecipe,
  createCategory,
  editCategory
} from '../models/recipe';
import { User } from '../models/user';
import { checkAdmin } from '../midleware/adminCheck';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  if (!req.user) return res.json({
    ok: false,
    message: 'none authorized'
  });
  const { text, recipeId } = req.body;

  if (text.trim().length < 6) return res.json({
    ok: false,
    message: 'короткий комментарий'
  });

  try {
    const createReq = await createCommentToRecipe(String((req.user as User).id), recipeId, text);
    res.json({
      ok: true,
      comment: createReq
    });
  } catch (err) {
    return res.json({
      ok: false,
      message: 'some error'
    });
  }
});

router.delete('/:id', checkAdmin, async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (!id) {
    return res.json({
      ok: false,
      message: 'нет id'
    });
  }

  try {
    const deleteReq = await deleteComment(id);

    res.json({
      ok: true,
      id
    });
  } catch (err) {
    res.json({
      ok: false
    });
  }
});

export { router as commentRouter };