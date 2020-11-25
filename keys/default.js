"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keys;
if (process.env.NODE_ENV === 'production') {
    keys = require('./prod').default;
}
else {
    keys = require('./dev').default;
}
exports.default = keys;
