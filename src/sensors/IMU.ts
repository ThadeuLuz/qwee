import i2c from "i2c-bus";
import MPU6050 from "i2c-mpu6050";

export interface IIMUState {
  gyroX: number;
  gyroY: number;
  gyroZ: number;
  accelX: number;
  accelY: number;
  accelZ: number;
  rotationX: number;
  rotationY: number;
}

const imuInitialState: IIMUState = {
  gyroX: 0,
  gyroY: 0,
  gyroZ: 0,
  accelX: 0,
  accelY: 0,
  accelZ: 0,
  rotationX: 0,
  rotationY: 0
};

const imuState = imuInitialState;
export const getImuState = () => imuState;

const IMU = () => {
  const address = 0x68;
  const i2c1 = i2c.openSync(1);
  const sensor = new MPU6050(i2c1, address);

  const update = () => {
    sensor.read(function(err: Error, data: any) {
      if (err) {
        console.log(err);
        Object.keys(imuInitialState).forEach(k => {
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
  };
};

export default IMU;
