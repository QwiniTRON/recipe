import express from 'express';
import fs from 'fs';
import { upload } from '../midleware/multerConfig';
import { recipeValidator } from '../utils/validators';
import { validationResult } from 'express-validator';
import path from 'path';
import {
  createRecipe,
  getAllRecipes,
  getOneRecipe,
  deleteRecipe,
  getShortRecipeById,
  ShortRecipe,
  editRecipe,
  recipeFiltersDictionary as recipeFilters
} from '../models/recipe';
import { checkAdmin } from '../midleware/adminCheck';



const router = express.Router();


// get
router.get('/', async (req: express.Request, res: express.Response) => {
  const { offset = 0, limit = 4, search, filter } = req.query;
  const parsedFilter = JSON.parse((filter as string) || '{}');

  try {
    const foundRecipes = await getAllRecipes(+offset, +limit, parsedFilter.filter as string, search as string, Number(parsedFilter.category_id));

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


// get one
router.get('/:id', async (req: express.Request, res: express.Response) => {
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


// create one 
router.post('/', upload.any(), recipeValidator, async (req: express.Request, res: express.Response) => {
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


// update one
router.put('/:id', upload.any(), recipeValidator, async (req: express.Request, res: express.Response) => {
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
      fs.unlink(path.resolve(__dirname, '..', 'imgs', oldPath), (err) => { });
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


// delete one
router.delete('/:id', checkAdmin, async (req: express.Request, res: express.Response) => {
  const { id: recipeId } = req.params;

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


export { router as recipeRpouter };