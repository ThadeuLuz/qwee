"use strict";
exports.__esModule = true;
var GpioMock = /** @class */ (function () {
    function GpioMock(pin, config) {
        var _this = this;
        this.pwmWrite = function (v) { return _this.log("pwmWrite")(v); };
        this.servoWrite = function (v) { return _this.log("pwmWrite")(v); };
        this.log = function (name) { return function (value) {
            console.log("FakeGpio", name, _this.pin, value);
        }; };
        this.pin = pin;
        this.config = config;
    }
    return GpioMock;
}());
var Gpio = process.env.QWEE ? require("pigpio").Gpio : GpioMock;
exports["default"] = Gpio;
