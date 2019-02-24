"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var i2c_bus_1 = __importDefault(require("i2c-bus"));
var i2c_mpu6050_1 = __importDefault(require("i2c-mpu6050"));
var imuInitialState = {
    gyroX: 0,
    gyroY: 0,
    gyroZ: 0,
    accelX: 0,
    accelY: 0,
    accelZ: 0,
    rotationX: 0,
    rotationY: 0
};
var imuState = imuInitialState;
exports.getImuState = function () { return imuState; };
var IMU = function () {
    var address = 0x68;
    var i2c1 = i2c_bus_1["default"].openSync(1);
    var sensor = new i2c_mpu6050_1["default"](i2c1, address);
    var update = function () {
        sensor.read(function (err, data) {
            if (err) {
                console.log(err);
                Object.keys(imuInitialState).forEach(function (k) {
                    imuState[k] = imuInitialState[k];
                });
                return;
            }
            imuState.gyroX = data.gyro.x;
            imuState.gyroY = data.gyro.y;
            imuState.gyroZ = data.gyro.z;
            imuState.accelX = data.accel.x;
            imuState.accelY = data.accel.y;
            imuState.accelZ = data.accel.z;
            imuState.rotationX = data.rotation.x;
            imuState.rotationY = data.rotation.y;
            update();
        });
        update();
    };
};
exports["default"] = IMU;
