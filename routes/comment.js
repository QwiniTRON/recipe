"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
var express_1 = __importDefault(require("express"));
var adminCheck_1 = require("../midleware/adminCheck");
var CommentController_1 = require("../controllers/CommentController");
var router = express_1.default.Router();
exports.commentRouter = router;
router.post('/', CommentController_1.CategoryController.create);
router.delete('/:id', adminCheck_1.checkAdmin, CommentController_1.CategoryController.delete);
