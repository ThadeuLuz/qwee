"use strict";
exports.__esModule = true;
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
// export const printStateAndMessages = () => {
//   console.clear();
//   console.log(state);
//   loggerState.forEach(({ type, payload }) => logFunctions[type](payload));
// };
