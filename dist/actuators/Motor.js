"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var Gpio = (process.env.QWEE ? require("pigpio-mock") : require("pigpio")).Gpio;
var raspi_board_1 = require("raspi-board");
var misc_1 = require("../helpers/misc");
var pins_1 = __importDefault(require("../helpers/pins"));
var Motor = /** @class */ (function (_super) {
    __extends(Motor, _super);
    function Motor(name) {
        return _super.call(this, raspi_board_1.getGpioNumber(pins_1["default"][name]), { mode: Gpio.OUTPUT }) || this;
    }
    Motor.prototype.set = function (v) {
        var pulseWidth = Math.round(misc_1.scale(v, 0, 1, 1000, 2000));
        _super.prototype.servoWrite.call(this, pulseWidth);
    };
    return Motor;
}(Gpio));
exports["default"] = Motor;
