"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user_1 = require("../models/user");
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    user_1.getUserById(id).then(function (user) { return done(null, user); }).catch(function (err) { return done(err, null); });
});
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (username, password, done) {
    user_1.getUser(username, password).then(function (user) {
        if (!user)
            return done(null, false, { message: 'неверные данные' });
        return done(null, user);
    }).catch(function (err) {
        done(err);
    });
}));
