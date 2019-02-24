"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Gpio = (process.env.QWEE ? require("pigpio-mock") : require("pigpio")).Gpio;
var raspi_board_1 = require("raspi-board");
var pins_1 = __importDefault(require("../helpers/pins"));
// Sound Speed constant
var MICROSECDONDS_PER_CM = 1e6 / 34321;
var SR04 = /** @class */ (function () {
    function SR04(name, onDistance) {
        var _this = this;
        var pinEcho = raspi_board_1.getGpioNumber(pins_1["default"][name]);
        var pinTrig = raspi_board_1.getGpioNumber(pins_1["default"][name]);
        this.pwmTrig = new Gpio(pinTrig, { mode: Gpio.OUTPUT });
        this.pwmEcho = new Gpio(pinEcho, { mode: Gpio.INPUT, alert: true });
        this.pwmEcho.on("alert", function (level, tick) {
            if (level === 1) {
                _this.startTick = tick;
            }
            else {
                var endTick = tick;
                // Unsigned 32 bit arithmetic
                var diff = (endTick >> 0) - (_this.startTick >> 0);
                var distanceInCm = diff / 2 / MICROSECDONDS_PER_CM;
                onDistance(distanceInCm);
            }
        });
    }
    SR04.prototype.getDistance = function () {
        // Set trigger high for 10 microseconds
        this.pwmTrig.trigger(10, 1);
    };
    return SR04;
}());
exports["default"] = SR04;
