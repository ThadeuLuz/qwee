"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var dualshock_1 = __importDefault(require("dualshock"));
var misc_1 = require("../helpers/misc");
var Logger_1 = require("../sensors/Logger");
exports.joystickInitialState = {
    status: "Starting",
    x: false,
    square: false,
    triangle: false,
    circle: false,
    l1: false,
    l2: 0,
    lStickX: 0,
    l3: false,
    lStickY: 0,
    r1: false,
    r2: 0,
    rStickY: 0,
    rStickX: 0,
    r3: false,
    hat: false,
    up: false,
    left: false,
    down: false,
    right: false,
    select: false,
    start: false,
    ps: false
};
var joystickState = exports.joystickInitialState;
exports.getJoystickState = function () { return joystickState; };
var digitalKeys = {
    cross: "x",
    circle: "circle",
    square: "square",
    triangle: "triangle",
    l1: "l1",
    r1: "r1",
    l3: "l3",
    r3: "r3",
    up: "up",
    down: "down",
    left: "left",
    right: "right",
    pad: "hat",
    select: "select",
    start: "start",
    ps: "ps"
};
var analogKeys = {
    l2: "l2",
    r2: "r2",
    lStickY: "lStickY",
    lStickX: "lStickX",
    rStickY: "rStickY",
    rStickX: "rStickX"
};
var dz = 15;
var mid = 255 / 2;
var normalizeStick = function (value) {
    if (mid - dz < value && value < mid + dz) {
        return 0;
    }
    return value > mid
        ? misc_1.scale(value, mid + dz, 255, 0, 1)
        : misc_1.scale(value, 0, mid - dz, -1, 0);
};
var waitForDevice = function (onFail) {
    return new Promise(function (resolve) {
        var attemptConnection = function () {
            var device = dualshock_1["default"].getDevices()[0];
            if (device) {
                Logger_1.info("Joystick found");
                resolve(device);
            }
            else {
                Logger_1.warn("No joystick found. Trying again in 5 second.");
                onFail();
                setTimeout(function () {
                    attemptConnection();
                }, 5000);
            }
        };
        attemptConnection();
    });
};
var fails = 0;
var Joystick = function () { return __awaiter(_this, void 0, void 0, function () {
    var device, gp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, waitForDevice(function () {
                    fails = fails + 1;
                    joystickState.status = "Failed " + fails + " times";
                })];
            case 1:
                device = _a.sent();
                gp = dualshock_1["default"].open(device);
                gp.ondigital = function (button, value) {
                    var stateKey = digitalKeys[button];
                    if (stateKey) {
                        joystickState[stateKey] = value;
                    }
                };
                gp.onanalog = function (axis, value) {
                    var stateKey = analogKeys[axis];
                    if (stateKey) {
                        // Normalize stick
                        if (stateKey.includes("Stick")) {
                            value = normalizeStick(value);
                        }
                        joystickState[stateKey] = value;
                    }
                };
                joystickState.status = "OK";
                return [2 /*return*/];
        }
    });
}); };
exports["default"] = Joystick;
