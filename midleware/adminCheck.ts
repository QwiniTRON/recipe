import express from 'express';
import { User } from '../models/user';

export const checkAdmin = (req: express.Request, res: express.Response, next: Function) => {
  if ((req.user as User)?.status != 1) {
    return res.json({
      ok: false,
      message: 'you are\'n the admin'
    });
  } 

  next();
}