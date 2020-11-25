"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
exports.checkAdmin = function (req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.status) != 1) {
        return res.json({
            ok: false,
            message: 'you are\'n the admin'
        });
    }
    next();
};
