"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var validators_1 = require("../utils/validators");
var UserController_1 = require("../controllers/UserController");
var router = express_1.default.Router();
exports.userRouter = router;
// login
router.post('/login', validators_1.loginValidator, UserController_1.UserController.login);
// reg
router.post('/register', validators_1.registerValidator, UserController_1.UserController.registration);
// logout
router.post('/logout', UserController_1.UserController.logout);
// check
router.post('/check', UserController_1.UserController.check);
