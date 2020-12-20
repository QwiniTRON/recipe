"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
var express_1 = __importDefault(require("express"));
var CategoryController_1 = require("../controllers/CategoryController");
var adminCheck_1 = require("../midleware/adminCheck");
var router = express_1.default.Router();
exports.categoryRouter = router;
router.get('/', CategoryController_1.CategoryController.getList);
router.put('/', adminCheck_1.checkAdmin, CategoryController_1.CategoryController.update);
router.post('/', adminCheck_1.checkAdmin, CategoryController_1.CategoryController.create);
