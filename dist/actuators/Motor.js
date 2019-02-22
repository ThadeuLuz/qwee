"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// @ts-ignore
var raspi_soft_pwm_1 = require("raspi-soft-pwm");
var pins_1 = __importDefault(require("../helpers/pins"));
var getMotor = function (name) {
    var motor = new raspi_soft_pwm_1.SoftPWM(pins_1["default"][name]);
    return motor;
};
exports["default"] = (function () { return ({
    motorTop: getMotor("motorTop"),
    motorBottom: getMotor("motorBottom")
}); });
