"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var chalk_1 = __importDefault(require("chalk"));
var IMU_1 = __importStar(require("./IMU"));
var Joystick_1 = __importStar(require("./Joystick"));
var Logger_1 = require("./Logger");
// Initialize sensors
Joystick_1["default"]();
IMU_1["default"]();
exports.getState = function () {
    return {
        joystick: Joystick_1.getJoystickState(),
        logs: Logger_1.getLoggerState(),
        imu: IMU_1.getImuState()
    };
};
exports.getHelpers = function (state, previousState) {
    var hasChanged = function (prop, subprop) {
        return state[prop][subprop] !== previousState[prop][subprop];
    };
    var changedTo = function (prop, subprop, value) {
        return hasChanged(prop, subprop) && state[prop][subprop] === value;
    };
    return { hasChanged: hasChanged, changedTo: changedTo };
};
var logFunctions = {
    log: function (p) { return console.log.apply(console, p.map(function (s) { return chalk_1["default"].blue(s); })); },
    info: function (p) { return console.info.apply(console, p.map(function (s) { return chalk_1["default"].green(s); })); },
    warn: function (p) { return console.warn.apply(console, p.map(function (s) { return chalk_1["default"].yellow(s); })); },
    error: function (p) { return console.error.apply(console, p.map(function (s) { return chalk_1["default"].red(s); })); }
};
exports.printLogs = function () {
    var _a = exports.getState(), logs = _a.logs, others = __rest(_a, ["logs"]);
    console.clear();
    console.log(others);
    logs.forEach(function (_a) {
        var type = _a.type, payload = _a.payload;
        logFunctions[type](payload);
    });
};
