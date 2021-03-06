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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = exports.Recipe = exports.recipeFiltersDictionary = void 0;
var connect_1 = __importDefault(require("../db/connect"));
var comment_1 = require("./comment");
var recipeFilters = {
    'dated': 'creat_date asc',
    'dateu': 'creat_date desc',
    'named': 'name asc',
    'nameu': 'name desc'
};
exports.recipeFiltersDictionary = {
    'dated': 'dated',
    'dateu': 'dateu',
    'named': 'named',
    'nameu': 'nameu'
};
var Recipe = /** @class */ (function () {
    function Recipe(comments, ingridients, recipe) {
        this.comments = comments;
        this.ingridients = ingridients;
        this.recipe = recipe;
    }
    return Recipe;
}());
exports.Recipe = Recipe;
var RecipeModel = /** @class */ (function () {
    function RecipeModel() {
    }
    RecipeModel.getAllRecipes = function (offset, limit, filter, search, category_id) {
        if (filter === void 0) { filter = 'dated'; }
        return __awaiter(this, void 0, void 0, function () {
            var queryString, queryStringCount, recipeReq, recipeCountReq, recipeRes, recipeCountRes, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryString = "\n      select * from recipe \n      where \n        id > 0\n        " + (search ? "and (name ILIKE '$3:value%' or name ILIKE '%$3:value%')" : '') + "\n        " + (category_id ? "and category_id = $4" : '') + "\n        order by $5:raw\n        offset $1 limit $2\n    ";
                        queryStringCount = "\n      select count(id) from recipe \n      where \n        id > 0\n        " + (search ? "and (name ILIKE '$3:value%' or name ILIKE '%$3:value%')" : '') + "\n        " + (category_id ? "and category_id = $4" : '') + "\n    ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        recipeReq = connect_1.default.many(queryString, [
                            offset, limit, search, category_id, recipeFilters[filter]
                        ]);
                        recipeCountReq = connect_1.default.one(queryStringCount, [
                            offset, limit, search, category_id
                        ]);
                        return [4 /*yield*/, recipeReq];
                    case 2:
                        recipeRes = _a.sent();
                        return [4 /*yield*/, recipeCountReq];
                    case 3:
                        recipeCountRes = _a.sent();
                        return [2 /*return*/, {
                                recipes: recipeRes,
                                count: +recipeCountRes.count
                            }];
                    case 4:
                        err_1 = _a.sent();
                        console.log();
                        return [2 /*return*/, {
                                recipes: [],
                                count: 0
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RecipeModel.getShortRecipeById = function (recipeId) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString;
            return __generator(this, function (_a) {
                queryString = "\n      select * from recipe where id = $1\n    ";
                try {
                    return [2 /*return*/, connect_1.default.one(queryString, [recipeId])];
                }
                catch (err) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    RecipeModel.getOneRecipe = function (recipeId) {
        return __awaiter(this, void 0, void 0, function () {
            var queryString, queryIngridientsString, recipeReq, ingridientsReq, commentsReq, _a, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        queryString = "\n      select mq.id, mq.name, mq.description, mq.creat_date, mq.photo_path, aj.nickname, cj.name as category_name\n      from recipe as mq \n        join users as aj on aj.id = author_id \n        join category as cj on cj.id = category_id \n      where mq.id = $1\n    ";
                        queryIngridientsString = "\n      select * from ingridients where recipe_id = $1\n    ";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        recipeReq = connect_1.default.oneOrNone(queryString, [recipeId]);
                        ingridientsReq = connect_1.default.many(queryIngridientsString, [recipeId]);
                        commentsReq = comment_1.Comment.getByRecipe(recipeId);
                        _a = {};
                        return [4 /*yield*/, recipeReq];
                    case 2:
                        _a.recipe = _b.sent();
                        return [4 /*yield*/, ingridientsReq];
                    case 3:
                        _a.ingridients = _b.sent();
                        return [4 /*yield*/, commentsReq];
                    case 4: return [2 /*return*/, (_a.comments = _b.sent(),
                            _a)];
                    case 5:
                        err_2 = _b.sent();
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    RecipeModel.deleteRecipe = function (recipeId) {
        var queryString = "\n      delete from recipe where id = $1\n    ";
        try {
            return connect_1.default.query(queryString, [recipeId]);
        }
        catch (err) {
            return null;
        }
    };
    RecipeModel.createRecipe = function (name, description, category_id, author_id, photo_path, ingridients) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRecipeString, ingridientsDataString, queryIngridientsString, createReq, recipeId, ingridientsReq, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRecipeString = "\n      insert into recipe(name, description, category_id, author_id, photo_path) values\n      ($1, $2, $3, $4, $5) returning id\n    ";
                        ingridientsDataString = ingridients.map(function (ing, idx) { return "($1, $" + (idx + 2) + ")"; }).join(', ');
                        queryIngridientsString = "\n      insert into ingridients(recipe_id, title) values \n      " + ingridientsDataString + "\n    ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, connect_1.default.one(queryRecipeString, [
                                name, description, category_id, author_id, photo_path
                            ])];
                    case 2:
                        createReq = _a.sent();
                        recipeId = createReq.id;
                        return [4 /*yield*/, connect_1.default.query(queryIngridientsString, __spreadArrays([
                                recipeId
                            ], ingridients))];
                    case 3:
                        ingridientsReq = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RecipeModel.editRecipe = function (recipeId, name, description, category_id, photo_path, ingridients) {
        return __awaiter(this, void 0, void 0, function () {
            var queryRecipeString, queryIngridientsString, queryIngridientsDeleteString, editReq, deleteReq, ingridientsReq, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryRecipeString = "\n      UPDATE recipe\n      SET name = $1, \n        description = $2, \n        category_id = $3, \n        photo_path = $4\n      WHERE id = $5\n    ";
                        queryIngridientsString = "\n      insert into ingridients(recipe_id, title) values \n      " + ingridients.map(function (ing, idx) { return "($1, $" + (idx + 2) + ")"; }).join(', ') + "\n    ";
                        queryIngridientsDeleteString = "\n      delete from ingridients where recipe_id = $1\n    ";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        editReq = connect_1.default.query(queryRecipeString, [
                            name, description, category_id, photo_path, recipeId
                        ]);
                        deleteReq = connect_1.default.query(queryIngridientsDeleteString, [recipeId]);
                        return [4 /*yield*/, editReq];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, deleteReq];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, connect_1.default.query(queryIngridientsString, __spreadArrays([
                                recipeId
                            ], ingridients))];
                    case 4:
                        ingridientsReq = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return RecipeModel;
}());
exports.RecipeModel = RecipeModel;
