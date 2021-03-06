"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = __importDefault(require("../keys/default"));
var pg_promise_1 = __importDefault(require("pg-promise"));
var dbPort = default_1.default.dbPort;
var dbName = default_1.default.dbName;
var dbPassword = default_1.default.dbPassword;
var dbHost = default_1.default.dbHost;
var dbDatabase = default_1.default.dbDatabse;
var connectString = "postgres://" + dbName + ":" + dbPassword + "@" + dbHost + ":" + dbPort + "/" + dbDatabase;
if (process.env.NODE_ENV === 'production') {
    console.log('DATABASE STRING ' + connectString);
}
var pgp = pg_promise_1.default();
var db = pgp(connectString);
exports.default = db;
