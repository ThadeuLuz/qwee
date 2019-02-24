"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var i2c_bus_1 = __importDefault(require("i2c-bus"));
var i2c_mpu6050_1 = __importDefault(require("i2c-mpu6050"));
var IMU = function () {
    try {
        var address = 0x68;
        var i2c1 = i2c_bus_1["default"].openSync(1);
        var sensor_1 = new i2c_mpu6050_1["default"](i2c1, address);
        setInterval(function () {
            sensor_1.read(function (err, data) {
                // if (err) {
                // throw err;
                // }
                // console.clear();
                console.log(data);
            });
        }, 100);
    }
    catch (err) {
        console.log("imu error");
    }
};
exports["default"] = IMU;
