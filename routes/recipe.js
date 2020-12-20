"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRpouter = void 0;
var express_1 = __importDefault(require("express"));
var multerConfig_1 = require("../midleware/multerConfig");
var validators_1 = require("../utils/validators");
var adminCheck_1 = require("../midleware/adminCheck");
var RecipeController_1 = require("../controllers/RecipeController");
var router = express_1.default.Router();
exports.recipeRpouter = router;
// get
router.get('/', RecipeController_1.RecipeController.getList);
// get one
router.get('/:id', RecipeController_1.RecipeController.getOne);
// create one 
router.post('/', multerConfig_1.upload.any(), validators_1.recipeValidator, RecipeController_1.RecipeController.create);
// update one
router.put('/:id', multerConfig_1.upload.any(), validators_1.recipeValidator, RecipeController_1.RecipeController.update);
// delete one
router.delete('/:id', adminCheck_1.checkAdmin, RecipeController_1.RecipeController.delete);
