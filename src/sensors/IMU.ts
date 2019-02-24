// import i2c from "i2c-bus";
// import MPU6050 from "i2c-mpu6050";

// var mpu6050 = require('mpu6050');
// @ts-ignore
import mpu6050 from "mpu6050";

const IMU = () => {
  // Instantiate and initialize.
  const mpu = new mpu6050();
  mpu.initialize();

  // Test the connection before using.
  mpu.testConnection(function(err, testPassed) {
    if (testPassed) {
      mpu.getMotion6(function(err, data) {
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

export default IMU;
