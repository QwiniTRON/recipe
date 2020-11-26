"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var default_1 = __importDefault(require("./keys/default"));
var passport_1 = __importDefault(require("passport"));
var path_1 = __importDefault(require("path"));
var express_session_1 = __importDefault(require("express-session"));
var connect_1 = __importDefault(require("./db/connect"));
var cookieParser = require('cookie-parser');
var user_1 = require("./routes/user");
var recipe_1 = require("./routes/recipe");
var app = express_1.default();
app.use('/imgs', express_1.default.static(path_1.default.resolve(__dirname, 'imgs')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
var sessionStore = new (require('connect-pg-simple')(express_session_1.default))({
    pgPromise: connect_1.default
});
// сессии
app.use(cookieParser());
app.use(express_session_1.default({
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    rolling: true,
    secret: default_1.default.secretKey,
    store: sessionStore
}));
require('./routes/passportConfig');
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// routes
app.use('/api/auth', user_1.userRouter);
app.use('/api/recipe', recipe_1.recipeRpouter);
// отдача клиента
app.use("/", express_1.default.static(path_1.default.join(__dirname, 'client', 'build')));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Something broke!');
});
app.listen(default_1.default.PORT, function () {
    console.log('listen on port ' + default_1.default.PORT);
});
