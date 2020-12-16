import express from 'express';
import {
  getCategoryes,
  Category,
  createCategory,
  editCategory
} from '../models/recipe';
import { checkAdmin } from '../midleware/adminCheck';

const router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const categories: Category[] = await getCategoryes();

    res.json({
      ok: true,
      categories: categories
    });
  } catch (err) {
    console.log(err);

    res.json({
      ok: false
    });
  }
});

router.put('/', checkAdmin, async (req: express.Request, res: express.Response) => {
  const { name, description, categoryId } = req.body;

  if (name.length < 3) {
    return res.json({
      ok: false
    });
  }

  if (description.length < 6) {
    return res.json({
      ok: false
    });
  }

  if (!categoryId) {
    return res.json({
      ok: false
    });
  }

  try {
    await editCategory(name, description, categoryId);
    res.json({
      ok: true
    });
  } catch (err) {
    res.json({
      ok: false
    });
  }
});

router.post('/', checkAdmin, async (req: express.Request, res: express.Response) => {
  const { name, description } = req.body;

  if (name.length < 3) {
    return res.json({
      ok: false
    });
  }

  if (description.length < 6) {
    return res.json({
      ok: false
    });
  }

  try {
    await createCategory(name, description);
    res.json({
      ok: true
    });
  } catch (err) {
    res.json({
      ok: false
    });
  }
});

export { router as categoryRouter };