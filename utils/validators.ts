import { body } from 'express-validator';
import { isExistsEmail, isExistsNickname } from '../models/user';
import { hasCategoyById } from '../models/recipe';

export const loginValidator = [
  body('email', 'email не по формату')
    .trim()
    .exists()
    .isEmail(),

  body('password', 'пароль должен быть не длинее 56 и не короче 6 символов')
    .exists()
    .trim()
    .isLength({ min: 6, max: 56 })
];

export const recipeValidator = [
  body('title', 'название должно быть не длинее 56 и не короче 3 символов')
    .exists()
    .trim()
    .isLength({ min: 3, max: 56 }),

  body('description', 'описание должно быть не длинее 2000 и не короче 15 символов')
    .exists()
    .trim()
    .isLength({ min: 15, max: 2000 }),

  body('category', 'нет такой категории')
    .custom((value: string) => new Promise((resolve, reject) => {
      hasCategoyById(+value).then(isExists => {
        if (!isExists) reject();
        else resolve();
      })
    })),

  body('ingridiens', 'ингридиенты не по формату')
    .custom((value: string[]) => {
      if (!Array.isArray(value)) value = [value];

      value.forEach((ingredient) => {
        if (ingredient.length < 3) return false;
      });

      return true;
    })
];

export const registerValidator = [
  body('email', 'email не по формату')
    .trim()
    .exists()
    .isEmail().bail()
    .custom(value => new Promise((resolve, reject) => {
      isExistsEmail(value).then((isExists) => {
        if (isExists) reject();
        else resolve();
      })
    })).withMessage('такой email уже зарегистрирован'),

  body('password')
    .trim()
    .isLength({ min: 6, max: 56 }),

  body('rpassword').custom((value, { req }) => {
    if (value !== req.body.password) throw 'пароли должны совпадать';

    return true;
  }),

  body('nickname', 'ник не длиннее 56 и не короче 3').trim()
    .isLength({ min: 3, max: 56 })
    .custom(value => new Promise((resolve, reject) => {
      isExistsNickname(value).then((isExists) => {
        if (isExists) reject();
        else resolve();
      })
    })).withMessage('такой ник уже есть')
];