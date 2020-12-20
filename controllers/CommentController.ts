import express from 'express';
import { Comment } from '../models/comment';
import { User } from '../models/user';

export class CategoryController {

  public static async create(req: express.Request, res: express.Response) {
    if (!req.user) return res.json({
      ok: false,
      message: 'none authorized'
    });
    const { text, recipeId } = req.body;

    if (text.trim().length < 6) return res.json({
      ok: false,
      message: 'короткий комментарий'
    });

    try {
      const createReq = await Comment.create(String((req.user as User).id), recipeId, text);
      res.json({
        ok: true,
        comment: createReq
      });
    } catch (err) {
      return res.json({
        ok: false,
        message: 'some error'
      });
    }
  }

  public static async delete(req: express.Request, res: express.Response) {
    const { id } = req.params;

    if (!id) {
      return res.json({
        ok: false,
        message: 'нет id'
      });
    }

    try {
      const deleteReq = await Comment.deleteComment(id);

      res.json({
        ok: true,
        id
      });
    } catch (err) {
      res.json({
        ok: false
      });
    }
  }

}