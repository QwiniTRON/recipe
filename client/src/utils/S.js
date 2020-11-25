"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S = exports.s = void 0;
function s() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.join(' ');
}
exports.s = s;
function S() {
    var classesNames = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classesNames[_i] = arguments[_i];
    }
    var classes = classesNames;
    var sfunction = function () {
        return classes.join(' ');
    };
    sfunction.add = function (className) {
        if (!classes.includes(className)) {
            classes.push(className);
        }
        return sfunction;
    };
    sfunction.remove = function (className) {
        var position = classes.indexOf(className);
        if (position !== -1)
            classes.splice(position, 1);
        return sfunction;
    };
    sfunction.toggle = function (className) {
        var position = classes.indexOf(className);
        if (position !== -1)
            classes.splice(position, 1);
        else
            classes[classes.length] = className;
        return sfunction;
    };
    return sfunction;
}
exports.S = S;
