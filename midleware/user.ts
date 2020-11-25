import db from '../db/connect';
import {getUserById} from '../models/user';
import express from 'express';

export async function populateUser(req: express.Request, res: express.Response, next: Function) {
  const id: string = (req.session as any).userId;

  if(id) {
    (req as any).userData = await getUserById(id);
  }

  next();
}