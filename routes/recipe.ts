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

// Get
router.get('/categories', async (req: express.Request, res: express.Response) => {
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


const recipeFilters = {
  'dated': 'dated',
  'dateu': 'dateu',
  'named': 'named',
  'nameu': 'nameu'
}
router.get('/all', async (req: express.Request, res: express.Response) => {
  const { offset = 0, limit = 4, search, category_id, filter } = req.query;

  try {
    const foundRecipes = await getAllRecipes(+offset, +limit, filter as string, search as string, Number(category_id));

    res.json({
      ok: true,
      recipes: foundRecipes.recipes,
      count: foundRecipes.count
    });
  } catch (err) {
    console.log(err);

    res.json({
      ok: false,
      recipes: [],
      count: 0
    });
  }
});

router.get('/one/:id', async (req: express.Request, res: express.Response) => {
  const recipeId = req.params.id;

  if (!recipeId) return res.json({
    ok: false
  });

  try {
    const reicpeData: object | boolean = await getOneRecipe(String(recipeId));
    if (!reicpeData) {
      res.json({
        ok: false
      });
    } else {
      res.json({
        ok: true,
        data: reicpeData
      })
    }
  } catch (err) {
    console.log(err);

    res.json({
      ok: false
    });
  }
});

// post 
router.post('/create', upload.any(), recipeValidator, async (req: express.Request, res: express.Response) => {
  const reqErrors = validationResult(req);
  if (!reqErrors.isEmpty()) {
    // на случай если с созданием произошла ошибка, просто удаляем фото
    fs.unlink(path.resolve(__dirname, '..', 'imgs', (req.files as any[])[0].filename), (err) => {
      console.log(err, 'err');
    })
    return res.json({
      ok: false,
      message: reqErrors.array()[0].msg
    });
  }


  const photoInfo = (req.files as any[])[0];
  if (!photoInfo) {
    return res.json({
      ok: false,
      message: 'file error'
    });
  } else {
    let { title, description, category, ingridiens } = req.body;
    if (!Array.isArray(ingridiens)) ingridiens = [ingridiens];

    const createReq = await createRecipe(
      title,
      description,
      category,
      (req.user as any).id,
      photoInfo.filename,
      ingridiens
    );
  }

  res.json({
    ok: true
  });
});

router.post('/edit/:id', upload.any(), recipeValidator, async (req: express.Request, res: express.Response) => {
  const reqErrors = validationResult(req);
  if (!reqErrors.isEmpty()) {
    // на случай если с созданием произошла ошибка, просто удаляем фото
    if ((req.files as any[])[0]) {
      fs.unlink(path.resolve(__dirname, '..', 'imgs', (req.files as any[])[0].filename), (err) => {
        console.log(err, 'err');
      });
    }

    return res.json({
      ok: false,
      message: reqErrors.array()[0].msg
    });
  }


  const photoInfo = (req.files as any[])[0];
  const recipeId = req.params.id;

  try {
    let { title, description, category, ingridiens, oldPath } = req.body;
    const photoPath = photoInfo ? photoInfo.filename : oldPath;

    await editRecipe(recipeId, title, description, category, photoPath, ingridiens);
    if (oldPath && photoInfo) {
      fs.unlink(path.resolve(__dirname, '..', 'imgs', oldPath), (err) => {
        console.log(err, 'err unlink');
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      ok: false
    });
  }


  res.json({
    ok: true
  });
});

router.post('/comment', async (req: express.Request, res: express.Response) => {
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

router.post('/delete/recipe', checkAdmin, async (req: express.Request, res: express.Response) => {
  const { recipeId } = req.body;

  if (!recipeId) {
    return res.json({
      ok: false,
      message: 'нет id'
    });
  }

  // __dirname и filename указывает именно на этот документ и где он лежит, а не на тот где он исполняется. 
  try {
    const recipe: ShortRecipe = await getShortRecipeById(recipeId);
    if (recipe.photo_path) {
      fs.unlink(path.resolve(__dirname, '..', 'imgs', recipe.photo_path), (err) => {
        if (err) console.log(err);
      });
    }
    const deleteReq = await deleteRecipe(recipeId);

    res.json({
      ok: true,
      recipeId
    });
  } catch (err) {
    res.json({
      ok: false
    });
  }
});

router.post('/delete/comment', checkAdmin, async (req: express.Request, res: express.Response) => {
  const { commentId } = req.body;

  if (!commentId) {
    return res.json({
      ok: false,
      message: 'нет id'
    });
  }

  try {
    const deleteReq = await deleteComment(commentId);

    res.json({
      ok: true,
      commentId
    });
  } catch (err) {
    res.json({
      ok: false
    });
  }
});

router.post('/category/create', checkAdmin, async (req: express.Request, res: express.Response) => {
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

router.post('/category/edit', checkAdmin, async (req: express.Request, res: express.Response) => {
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

export { router as recipeRpouter };