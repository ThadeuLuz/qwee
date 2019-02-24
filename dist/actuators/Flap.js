"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Gpio = (process.env.QWEE ? require("pigpio-mock") : require("pigpio")).Gpio;
var node_pid_controller_1 = __importDefault(require("node-pid-controller"));
var raspi_board_1 = require("raspi-board");
var misc_1 = require("../helpers/misc");
var pins_1 = __importDefault(require("../helpers/pins"));
var controllerConfig = {
    k_p: 0.25,
    k_i: 0.0,
    k_d: 0.0
};
var rangeOffset = 350; // range in pulses
var Flap = /** @class */ (function () {
    function Flap(name, offset) {
        if (offset === void 0) { offset = 0; }
        var center = 1500 + offset;
        this.range = {
            min: center - rangeOffset,
            max: center + rangeOffset
        };
        var pin = raspi_board_1.getGpioNumber(pins_1["default"][name]);
        this.pwm = new Gpio(pin, { mode: Gpio.OUTPUT });
        this.controller = new node_pid_controller_1["default"](controllerConfig);
    }
    Flap.prototype.set = function (stickValue, rotation) {
        var correction = this.controller.update(rotation);
        var value = stickValue + correction;
        var _a = this.range, min = _a.min, max = _a.max;
        var pulse = misc_1.scale(value, -1, 1, min, max);
        this.pwm.servoWrite(Math.round(pulse));
    };
    return Flap;
}());
exports["default"] = Flap;
