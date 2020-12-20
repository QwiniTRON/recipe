import express from 'express';
import { validationResult } from 'express-validator';
import passport from 'passport';
import { User, registerUser, getUser, ReqWithUser } from '../models/user';


export class UserController {
  public static async login(req: express.Request, res: express.Response) {
    // validate
    const validationResultReq = validationResult(req);
    if (!validationResultReq.isEmpty()) {
      return res.json({
        ok: false,
        message: validationResultReq.array()[0].msg
      })
    }


    passport.authenticate('local', function (err: any, user: User, info: any) {
      if (err) throw err;
      if (!user) return res.json({ ok: false, message: 'неверные данные' });

      req.login(user, function (err) {
        if (err) return res.json({ ok: false, message: 'неверные данные' });

        return res.json({
          ok: true,
          user: {
            id: user.id,
            nickname: user.nickname,
            status: user.status
          }
        });
      });
    })(req, res);
  }


  public static async registration(req: express.Request, res: express.Response) {
    // validate
    const validationResultReq = validationResult(req);
    if (!validationResultReq.isEmpty()) {
      return res.json({
        ok: false,
        message: validationResultReq.array()[0].msg
      })
    }

    const { email, password, nickname } = req.body;
    try {
      await registerUser(password, email, nickname);
      res.json({ ok: true });
    } catch (err) {
      console.log('Reg err • ', err);

      res.json({ ok: false, message: 'что-то пошло не так...' });
    }
  }


  public static async logout(req: express.Request, res: express.Response) {
    req.logOut();

    res.json({ ok: true });
  }


  public static async check(req: express.Request, res: express.Response) {
    if (req.user) {
      const user = {
        nickname: (req.user as User).nickname,
        status: (req.user as User).status,
        id: (req.user as User).id
      }
      return res.json({
        ok: true,
        user
      })
    } else {
      return res.json({
        ok: false
      })
    }
  }
}