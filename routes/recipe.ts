import express from 'express';
import { upload } from '../midleware/multerConfig';
import { recipeValidator } from '../utils/validators';
import { checkAdmin } from '../midleware/adminCheck';
import { RecipeController } from '../controllers/RecipeController';


const router = express.Router();

// get
router.get('/', RecipeController.getList);

// get one
router.get('/:id', RecipeController.getOne);

// create one 
router.post('/', upload.any(), recipeValidator, RecipeController.create);

// update one
router.put('/:id', upload.any(), recipeValidator, RecipeController.update);

// delete one
router.delete('/:id', checkAdmin, RecipeController.delete);


export { router as recipeRpouter };