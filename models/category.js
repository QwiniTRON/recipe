"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.Category = void 0;
var connect_1 = __importDefault(require("../db/connect"));
var Category = /** @class */ (function () {
    function Category(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
    return Category;
}());
exports.Category = Category;
var CategoryModel = /** @class */ (function () {
    function CategoryModel() {
    }
    CategoryModel.createCategory$C = function (category) {
        var queryString = "\n      insert into category(name, description)\n      values \n      ($1, $2)\n    ";
        return connect_1.default.query(queryString, [
            category.name, category.description
        ]);
    };
    ;
    CategoryModel.createCategory = function (name, description) {
        var queryString = "\n      insert into category(name, description)\n      values \n      ($1, $2)\n    ";
        return connect_1.default.query(queryString, [
            name, description
        ]);
    };
    CategoryModel.editCategory$C = function (name) {
        var queryString = "\n    update category set \n      name = $1,\n      description = $2\n    where id = $3\n  ";
        return connect_1.default.query(queryString, [
            name.name, name.description, name.id
        ]);
    };
    CategoryModel.editCategory = function (name, description, categoryId) {
        var queryString = "\n      update category set \n        name = $1,\n        description = $2\n      where id = $3\n    ";
        return connect_1.default.query(queryString, [
            name, description, categoryId
        ]);
    };
    CategoryModel.hasCategoyById = function (id) {
        var queryString = "\n      select id from category where id = $1\n    ";
        return connect_1.default.oneOrNone(queryString, [
            id
        ]).then(function (exists) { return Boolean(exists); });
    };
    CategoryModel.getCategoryes = function () {
        var queryString = "\n      select * from category\n    ";
        return connect_1.default.many(queryString);
    };
    return CategoryModel;
}());
exports.CategoryModel = CategoryModel;
// Model логика взаимодействия с данными такого типа
// class неопсредственная реализация объекта данного типа
// для перегрузок можно использовать name$signature
