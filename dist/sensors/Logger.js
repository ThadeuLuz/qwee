"use strict";
exports.__esModule = true;
var loggerState = Array(10)
    .fill("")
    .map(function () { return ({ type: "log", payload: [] }); });
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
// const logFunctions: Record<LogType, (p: string[]) => void> = {
//   log: (p: string[]) => console.log("🐟", ...p.map(s => chalk.blue(s))),
//   info: (p: string[]) => console.info("🐸", ...p.map(s => chalk.green(s))),
//   warn: (p: string[]) => console.warn("🐱", ...p.map(s => chalk.yellow(s))),
//   error: (p: string[]) => console.error("🐞", ...p.map(s => chalk.red(s)))
// };
// export const printStateAndMessages = () => {
//   console.clear();
//   console.log(state);
//   loggerState.forEach(({ type, payload }) => logFunctions[type](payload));
// };
