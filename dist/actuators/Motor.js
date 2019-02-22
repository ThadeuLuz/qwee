"use strict";
exports.__esModule = true;
// @ts-ignore
// import { SoftPWM } from "raspi-soft-pwm";
var pigpio_1 = require("pigpio");
var getMotor = function (name) {
    // const motor = new SoftPWM(pins[name]);
    var motor = new pigpio_1.Gpio(23, { mode: pigpio_1.Gpio.OUTPUT });
    return motor;
};
exports["default"] = (function () { return ({
    motorTop: getMotor("motorTop")
    // motorBottom: getMotor("motorBottom")
}); });
