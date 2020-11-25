"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var storageConfig = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        console.log();
        callback(null, 'imgs');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});
var upload = multer_1.default({
    dest: 'imgs/',
    storage: storageConfig
});
exports.upload = upload;
