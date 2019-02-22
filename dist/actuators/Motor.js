"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Gpio = (process.env.QWEE ? require("pigpio-mock") : require("pigpio")).Gpio;
var raspi_board_1 = require("raspi-board");
var misc_1 = require("../helpers/misc");
var pins_1 = __importDefault(require("../helpers/pins"));
var Motor = /** @class */ (function () {
    function Motor(name) {
        var pin = raspi_board_1.getGpioNumber(pins_1["default"][name]);
        console.log("pin", pin);
        this.pwm = new Gpio(pin, { mode: Gpio.OUTPUT });
    }
    Motor.prototype.set = function (v) {
        var pulseWidth = Math.round(misc_1.scale(v, 0, 1, 1000, 2000));
        this.pwm.servoWrite(pulseWidth);
    };
    return Motor;
}());
exports["default"] = Motor;
