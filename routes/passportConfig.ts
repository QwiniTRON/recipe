const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

import { getUser, getUserById } from '../models/user';


passport.serializeUser(function (user: any, done: Function) {
  done(null, user.id);
});

passport.deserializeUser(function (id: string, done: Function) {
  getUserById(id).then(user => done(null, user)).catch(err => done(err, null));
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (username: string, password: string, done: Function) {
    getUser(username, password).then((user) => {
      if (!user) return done(null, false, { message: 'неверные данные' });

      return done(null, user);
    }).catch((err) => {
      done(err);
    });
  }
));