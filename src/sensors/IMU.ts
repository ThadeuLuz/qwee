import i2c from "i2c-bus";
import MPU6050 from "i2c-mpu6050";

const address = 0x68;
const i2c1 = i2c.openSync(1);
const sensor = new MPU6050(i2c1, address);
const data = sensor.readSync();

const IMU = () => {
  setInterval(() => {
    console.log(data);
  }, 100);
};

export default IMU;
