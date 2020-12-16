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
// const dbHost = keys.dbHost;
var dbDatabase = default_1.default.dbDatabse;
var pgp = pg_promise_1.default();
var db = pgp("postgres://" + dbName + ":" + dbPassword + "@" + "postgres" + ":" + dbPort + "/" + dbDatabase);
exports.default = db;
