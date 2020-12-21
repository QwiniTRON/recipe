"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidator = exports.recipeValidator = exports.loginValidator = void 0;
var express_validator_1 = require("express-validator");
var user_1 = require("../models/user");
var category_1 = require("../models/category");
exports.loginValidator = [
    express_validator_1.body('email', 'email не по формату')
        .trim()
        .exists()
        .isEmail(),
    express_validator_1.body('password', 'пароль должен быть не длинее 56 и не короче 6 символов')
        .exists()
        .trim()
        .isLength({ min: 6, max: 56 })
];
exports.recipeValidator = [
    express_validator_1.body('title', 'название должно быть не длинее 56 и не короче 3 символов')
        .exists()
        .trim()
        .isLength({ min: 3, max: 56 }),
    express_validator_1.body('description', 'описание должно быть не длинее 2000 и не короче 15 символов')
        .exists()
        .trim()
        .isLength({ min: 15, max: 2000 }),
    express_validator_1.body('category', 'нет такой категории')
        .custom(function (value) { return new Promise(function (resolve, reject) {
        category_1.CategoryModel.hasCategoyById(+value).then(function (isExists) {
            if (!isExists)
                reject();
            else
                resolve(isExists);
        });
    }); }),
    express_validator_1.body('ingridiens', 'ингридиенты не по формату')
        .custom(function (value) {
        if (!Array.isArray(value))
            value = [value];
        value.forEach(function (ingredient) {
            if (ingredient.length < 3)
                return false;
        });
        return true;
    })
];
exports.registerValidator = [
    express_validator_1.body('email', 'email не по формату')
        .trim()
        .exists()
        .isEmail().bail()
        .custom(function (value) { return new Promise(function (resolve, reject) {
        user_1.isExistsEmail(value).then(function (isExists) {
            if (isExists)
                reject();
            else
                resolve(isExists);
        });
    }); }).withMessage('такой email уже зарегистрирован'),
    express_validator_1.body('password')
        .trim()
        .isLength({ min: 6, max: 56 }),
    express_validator_1.body('rpassword').custom(function (value, _a) {
        var req = _a.req;
        if (value !== req.body.password)
            throw 'пароли должны совпадать';
        return true;
    }),
    express_validator_1.body('nickname', 'ник не длиннее 56 и не короче 3').trim()
        .isLength({ min: 3, max: 56 })
        .custom(function (value) { return new Promise(function (resolve, reject) {
        user_1.isExistsNickname(value).then(function (isExists) {
            if (isExists)
                reject();
            else
                resolve(isExists);
        });
    }); }).withMessage('такой ник уже есть')
];
