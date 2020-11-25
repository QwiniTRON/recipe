import express from 'express';
const router = express.Router();
import passport from 'passport';
import { User, registerUser, getUser, ReqWithUser } from '../models/user';
import { loginValidator, registerValidator } from '../utils/validators';
import { validationResult } from 'express-validator';

// login
router.post('/login', loginValidator, async (req: express.Request, res: express.Response) => {
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
})

// reg
router.post('/register', registerValidator, async (req: express.Request, res: express.Response) => {
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
})

// logout
router.post('/logout', async (req: express.Request, res: express.Response) => {
  req.logOut();

  res.json({ ok: true });
})

// check
router.post('/check', async (req: express.Request, res: express.Response) => {
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
})

export { router as userRouter };