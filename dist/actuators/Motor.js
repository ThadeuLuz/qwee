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
var johnny_five_1 = require("johnny-five");
var misc_1 = require("../helpers/misc");
var pins_1 = __importDefault(require("../helpers/pins"));
var Motor = /** @class */ (function (_super) {
    __extends(Motor, _super);
    function Motor(name) {
        return _super.call(this, {
            pin: pins_1["default"][name],
            startAt: 0,
            range: [0, 180]
        }) || this;
    }
    Motor.prototype.set = function (value) {
        this.to(Math.round(misc_1.scale(value, 0, 1, 0, 180)));
    };
    return Motor;
}(johnny_five_1.Servo));
exports["default"] = Motor;
// const getMotor = (name: MotorName) => {
//   const motor = new Servo({
//     pin: pins[name],
//     startAt: 0,
//     range: [0, 180]
//   });
//   return motor;
// };
// export default () => ({
//   motorTop: getMotor("motorTop"),
//   motorBottom: getMotor("motorBottom")
// });
