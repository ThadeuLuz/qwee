"use strict";
exports.__esModule = true;
var RaspiMock = /** @class */ (function () {
    function RaspiMock(pin, config) {
        var _this = this;
        this.pwmWrite = function (v) { return _this.log("pwmWrite")(v); };
        this.servoWrite = function (v) { return _this.log("pwmWrite")(v); };
        this.log = function (name) { return function (value) {
            console.log("FakeGpio", name, _this.pin, value);
        }; };
        this.pin = pin;
        this.config = config;
    }
    return RaspiMock;
}());
var Raspi = process.env.QWEE ? require("raspi-io") : RaspiMock;
exports["default"] = Raspi;
