"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var johnny_five_1 = require("johnny-five");
var pins_1 = __importDefault(require("../helpers/pins"));
var getMotor = function (name) {
    var motor = new johnny_five_1.Servo({
        pin: pins_1["default"][name],
        startAt: 0,
        range: [0, 180]
    });
    return motor;
};
exports["default"] = (function () { return ({
    motorTop: getMotor("motorTop"),
    motorBottom: getMotor("motorBottom")
}); });
