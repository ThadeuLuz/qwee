"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var chalk_1 = __importDefault(require("chalk"));
exports.log = function () {
    var p = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        p[_i] = arguments[_i];
    }
    return console.log(chalk_1["default"].blue.apply(chalk_1["default"], p));
};
exports.info = function () {
    var p = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        p[_i] = arguments[_i];
    }
    return console.info(chalk_1["default"].green.apply(chalk_1["default"], p));
};
exports.warn = function () {
    var p = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        p[_i] = arguments[_i];
    }
    return console.warn(chalk_1["default"].yellow.apply(chalk_1["default"], p));
};
exports.error = function () {
    var p = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        p[_i] = arguments[_i];
    }
    return console.error(chalk_1["default"].red.apply(chalk_1["default"], p));
};
exports.scale = function (value, fromLow, fromHigh, toLow, toHigh) {
    var clampV = Math.min(Math.max(fromLow, value), fromHigh);
    if (clampV !== value) {
        exports.warn("Value " + value + " clamped in range " + fromLow + "-" + fromHigh);
    }
    return ((clampV - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
};
