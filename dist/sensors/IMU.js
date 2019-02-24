"use strict";
// import i2c from "i2c-bus";
// import MPU6050 from "i2c-mpu6050";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// var mpu6050 = require('mpu6050');
// @ts-ignore
var mpu6050_1 = __importDefault(require("mpu6050"));
var IMU = function () {
    // Instantiate and initialize.
    var mpu = new mpu6050_1["default"]();
    mpu.initialize();
    // Test the connection before using.
    mpu.testConnection(function (err, testPassed) {
        if (testPassed) {
            mpu.getMotion6(function (err, data) {
                console.log(data);
            });
            // Put the MPU6050 back to sleep.
            mpu.setSleepEnabled(1);
        }
    });
    // ---------
    // const address = 0x68;
    // const i2c1 = i2c.openSync(1);
    // const sensor = new MPU6050(i2c1);
    // const data = sensor.readSync();
    // setInterval(() => {
    //   console.log(data);
    // }, 100);
};
exports["default"] = IMU;
