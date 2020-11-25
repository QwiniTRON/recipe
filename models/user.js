"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.isExistsEmail = exports.isExistsNickname = exports.getUserById = exports.getUser = void 0;
var connect_1 = __importDefault(require("../db/connect"));
function getUser(username, password) {
    var queryString = "SELECT * FROM users WHERE password = $1 and login = $2";
    return connect_1.default.oneOrNone(queryString, [
        password, username
    ]);
}
exports.getUser = getUser;
function getUserById(id) {
    var queryString = "SELECT * FROM users WHERE id = $1";
    return connect_1.default.oneOrNone(queryString, [
        id
    ]);
}
exports.getUserById = getUserById;
function isExistsNickname(nickname) {
    var queryString = "SELECT * FROM users WHERE nickname = $1";
    return connect_1.default.oneOrNone(queryString, [
        nickname
    ]).then(function (exists) { return Boolean(exists); });
}
exports.isExistsNickname = isExistsNickname;
function isExistsEmail(email) {
    var queryString = "SELECT * FROM users WHERE login = $1";
    return connect_1.default.oneOrNone(queryString, [
        email
    ]).then(function (exists) { return Boolean(exists); });
}
exports.isExistsEmail = isExistsEmail;
function registerUser(password, login, nickname) {
    var queryString = "\n    INSERT INTO users(password, login, nickname) values \n    ($1, $2, $3)\n  ";
    return connect_1.default.query(queryString, [
        password, login, nickname
    ]);
}
exports.registerUser = registerUser;
