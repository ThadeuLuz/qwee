var i2c = require("i2c-bus");
var MPU6050 = require("i2c-mpu6050");
var address = 0x68;
var i2c1 = i2c.openSync(1);
var sensor = new MPU6050(i2c1, address);
var data = sensor.readSync();
setInterval(function () {
    console.log(data);
}, 100);
// export interface IMUState {
//   status: string;
//   temperature: number;
//   accel_x: number;
//   accel_y: number;
//   accel_z: number;
//   gyro_x: number;
//   gyro_y: number;
//   gyro_z: number;
//   isCalibrated: boolean;
// }
// export const IMUState: IMUState = {
//   status: "",
//   temperature: 0,
//   accel_x: 0,
//   accel_y: 0,
//   accel_z: 0,
//   gyro_x: 0,
//   gyro_y: 0,
//   gyro_z: 0,
//   isCalibrated: false
// };
// export const getIMUState = () => IMUState;
// const IMU = () => {
//   const imu = new five.IMU({
//     controller: "MPU6050"
//   });
//   imu.on("change", () => {
//     IMUState.status = "OK";
//     IMUState.temperature = this.thermometer.celsius;
//     IMUState.accel_x = this.accelerometer.x;
//     IMUState.accel_y = this.accelerometer.y;
//     IMUState.accel_z = this.accelerometer.z;
//     IMUState.gyro_x = this.gyro.x;
//     IMUState.gyro_y = this.gyro.y;
//     IMUState.gyro_z = this.gyro.z;
//     IMUState.isCalibrated = this.gyro.z;
//   });
//   return imu;
// };
// export default IMU;
