"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRpouter = void 0;
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var multerConfig_1 = require("../midleware/multerConfig");
var validators_1 = require("../utils/validators");
var express_validator_1 = require("express-validator");
var path_1 = __importDefault(require("path"));
var recipe_1 = require("../models/recipe");
var adminCheck_1 = require("../midleware/adminCheck");
var router = express_1.default.Router();
exports.recipeRpouter = router;
// get
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, offset, _c, limit, search, filter, parsedFilter, foundRecipes, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, _b = _a.offset, offset = _b === void 0 ? 0 : _b, _c = _a.limit, limit = _c === void 0 ? 4 : _c, search = _a.search, filter = _a.filter;
                parsedFilter = JSON.parse(filter || '{}');
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, recipe_1.getAllRecipes(+offset, +limit, parsedFilter.filter, search, Number(parsedFilter.category_id))];
            case 2:
                foundRecipes = _d.sent();
                res.json({
                    ok: true,
                    recipes: foundRecipes.recipes,
                    count: foundRecipes.count
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _d.sent();
                console.log(err_1);
                res.json({
                    ok: false,
                    recipes: [],
                    count: 0
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// get one
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, reicpeData, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                recipeId = req.params.id;
                if (!recipeId)
                    return [2 /*return*/, res.json({
                            ok: false
                        })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, recipe_1.getOneRecipe(String(recipeId))];
            case 2:
                reicpeData = _a.sent();
                if (!reicpeData) {
                    res.json({
                        ok: false
                    });
                }
                else {
                    res.json({
                        ok: true,
                        data: reicpeData
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                res.json({
                    ok: false
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// create one 
router.post('/', multerConfig_1.upload.any(), validators_1.recipeValidator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqErrors, photoInfo, _a, title, description, category, ingridiens, createReq;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                reqErrors = express_validator_1.validationResult(req);
                if (!reqErrors.isEmpty()) {
                    // на случай если с созданием произошла ошибка, просто удаляем фото
                    fs_1.default.unlink(path_1.default.resolve(__dirname, '..', 'imgs', req.files[0].filename), function (err) {
                        console.log(err, 'err');
                    });
                    return [2 /*return*/, res.json({
                            ok: false,
                            message: reqErrors.array()[0].msg
                        })];
                }
                photoInfo = req.files[0];
                if (!!photoInfo) return [3 /*break*/, 1];
                return [2 /*return*/, res.json({
                        ok: false,
                        message: 'file error'
                    })];
            case 1:
                _a = req.body, title = _a.title, description = _a.description, category = _a.category, ingridiens = _a.ingridiens;
                if (!Array.isArray(ingridiens))
                    ingridiens = [ingridiens];
                return [4 /*yield*/, recipe_1.createRecipe(title, description, category, req.user.id, photoInfo.filename, ingridiens)];
            case 2:
                createReq = _b.sent();
                _b.label = 3;
            case 3:
                res.json({
                    ok: true
                });
                return [2 /*return*/];
        }
    });
}); });
// update one
router.put('/:id', multerConfig_1.upload.any(), validators_1.recipeValidator, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var reqErrors, photoInfo, recipeId, _a, title, description, category, ingridiens, oldPath, photoPath, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                reqErrors = express_validator_1.validationResult(req);
                if (!reqErrors.isEmpty()) {
                    // на случай если с созданием произошла ошибка, просто удаляем фото
                    if (req.files[0]) {
                        fs_1.default.unlink(path_1.default.resolve(__dirname, '..', 'imgs', req.files[0].filename), function (err) {
                            console.log(err, 'err');
                        });
                    }
                    return [2 /*return*/, res.json({
                            ok: false,
                            message: reqErrors.array()[0].msg
                        })];
                }
                photoInfo = req.files[0];
                recipeId = req.params.id;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                _a = req.body, title = _a.title, description = _a.description, category = _a.category, ingridiens = _a.ingridiens, oldPath = _a.oldPath;
                photoPath = photoInfo ? photoInfo.filename : oldPath;
                return [4 /*yield*/, recipe_1.editRecipe(recipeId, title, description, category, photoPath, ingridiens)];
            case 2:
                _b.sent();
                if (oldPath && photoInfo) {
                    fs_1.default.unlink(path_1.default.resolve(__dirname, '..', 'imgs', oldPath), function (err) { });
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.json({
                        ok: false
                    })];
            case 4:
                res.json({
                    ok: true
                });
                return [2 /*return*/];
        }
    });
}); });
// delete one
router.delete('/:id', adminCheck_1.checkAdmin, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe, deleteReq, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                recipeId = req.params.id;
                if (!recipeId) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            message: 'нет id'
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, recipe_1.getShortRecipeById(recipeId)];
            case 2:
                recipe = _a.sent();
                if (recipe.photo_path) {
                    fs_1.default.unlink(path_1.default.resolve(__dirname, '..', 'imgs', recipe.photo_path), function (err) {
                        if (err)
                            console.log(err);
                    });
                }
                return [4 /*yield*/, recipe_1.deleteRecipe(recipeId)];
            case 3:
                deleteReq = _a.sent();
                res.json({
                    ok: true,
                    recipeId: recipeId
                });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                res.json({
                    ok: false
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
