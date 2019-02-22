"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Joystick_1 = __importStar(require("./Joystick"));
var Logger_1 = require("./Logger");
// Initialize sensors
Joystick_1["default"]();
exports.getState = function () {
    return {
        joystick: Joystick_1.getJoystickState(),
        logs: Logger_1.getLoggerState()
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
