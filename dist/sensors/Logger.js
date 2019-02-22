"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var chalk_1 = __importDefault(require("chalk"));
exports.loggerInitialState = Array(10)
    .fill("")
    .map(function () { return ({ type: "log", payload: [] }); });
var loggerState = exports.loggerInitialState;
exports.getLoggerState = function () { return loggerState; };
exports.getLogger = function (type) { return function () {
    var payload = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        payload[_i] = arguments[_i];
    }
    loggerState.shift();
    loggerState.push({ type: type, payload: payload });
}; };
exports.log = exports.getLogger("log");
exports.info = exports.getLogger("info");
exports.warn = exports.getLogger("warn");
exports.error = exports.getLogger("error");
var logFunctions = {
    log: function (p) { return console.log.apply(console, ["🐟"].concat(p.map(function (s) { return chalk_1["default"].blue(s); }))); },
    info: function (p) { return console.info.apply(console, ["🐸"].concat(p.map(function (s) { return chalk_1["default"].green(s); }))); },
    warn: function (p) { return console.warn.apply(console, ["🐱"].concat(p.map(function (s) { return chalk_1["default"].yellow(s); }))); },
    error: function (p) { return console.error.apply(console, ["🐞"].concat(p.map(function (s) { return chalk_1["default"].red(s); }))); }
};
exports.printLogs = function () {
    console.clear();
    loggerState.forEach(function (_a) {
        var type = _a.type, payload = _a.payload;
        logFunctions[type](payload);
    });
};
// export const printStateAndMessages = () => {
//   console.clear();
//   console.log(state);
//   loggerState.forEach(({ type, payload }) => logFunctions[type](payload));
// };
