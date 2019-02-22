"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var johnny_five_1 = __importDefault(require("johnny-five"));
exports.IMUState = {
    status: "",
    temperature: 0,
    accel_x: 0,
    accel_y: 0,
    accel_z: 0,
    gyro_x: 0,
    gyro_y: 0,
    gyro_z: 0,
    isCalibrated: false
};
exports.getIMUState = function () { return exports.IMUState; };
var IMU = function () {
    var imu = new johnny_five_1["default"].IMU({
        controller: "MPU6050"
    });
    imu.on("change", function () {
        exports.IMUState.status = "OK";
        exports.IMUState.temperature = _this.thermometer.celsius;
        exports.IMUState.accel_x = _this.accelerometer.x;
        exports.IMUState.accel_y = _this.accelerometer.y;
        exports.IMUState.accel_z = _this.accelerometer.z;
        exports.IMUState.gyro_x = _this.gyro.x;
        exports.IMUState.gyro_y = _this.gyro.y;
        exports.IMUState.gyro_z = _this.gyro.z;
        exports.IMUState.isCalibrated = _this.gyro.z;
    });
    return imu;
};
exports["default"] = IMU;
