import express from 'express';
import { Category, CategoryModel } from '../models/category';


export class CategoryController {

  static async getList(req: express.Request, res: express.Response) {
    try {
      const categories: Category[] = await CategoryModel.getCategoryes();

      res.json({
        ok: true,
        categories: categories
      });
    } catch (err) {
      console.log(err);

      res.json({
        ok: false
      });
    }
  }

  static async update(req: express.Request, res: express.Response) {
    const { name, description, categoryId } = req.body;

    if (name.length < 3) {
      return res.json({
        ok: false
      });
    }

    if (description.length < 6) {
      return res.json({
        ok: false
      });
    }

    if (!categoryId) {
      return res.json({
        ok: false
      });
    }

    try {
      await CategoryModel.editCategory(name as string, description as string, categoryId as string);
      res.json({
        ok: true
      });
    } catch (err) {
      res.json({
        ok: false
      });
    }
  }

  static async create(req: express.Request, res: express.Response) {
    const { name, description } = req.body;

    if (name.length < 3) {
      return res.json({
        ok: false
      });
    }

    if (description.length < 6) {
      return res.json({
        ok: false
      });
    }

    try {
      await CategoryModel.createCategory(name, description);
      res.json({
        ok: true
      });
    } catch (err) {
      res.json({
        ok: false
      });
    }
  }

  static async getOne(req: express.Request, res: express.Response) {
    const categoryId: string = req.params.id;


  }
}