import express from 'express';
import keys from './keys/default';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import db from './db/connect';
const cookieParser = require('cookie-parser');
import { userRouter } from './routes/user';
import { recipeRpouter } from './routes/recipe';
import { categoryRouter } from './routes/categories';
import { commentRouter } from './routes/comment';


const app: express.Application = express();

app.use('/imgs', express.static(path.resolve(__dirname, 'imgs')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new (require('connect-pg-simple')(session))({
  pgPromise: db
});
// сессии
app.use(cookieParser());
app.use(session({
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  },
  rolling: true,
  secret: keys.secretKey,
  store: sessionStore
}));
require('./routes/passportConfig');
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/api/auth', userRouter);
app.use('/api/recipe', recipeRpouter);
app.use('/api/category', categoryRouter);
app.use('/api/comment', commentRouter);


// отдача клиента
app.use("/", express.static(path.join(__dirname, 'client', 'build')));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use(function (err: any, req: express.Request, res: express.Response, next: Function) {
  console.error(err);
  res.status(500).send('Something broke!');
});


app.listen(keys.PORT, () => {
  console.log('listen on port ' + keys.PORT);
});