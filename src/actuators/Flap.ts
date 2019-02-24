import { State } from "../sensors";
const { Gpio } = process.env.QWEE ? require("pigpio-mock") : require("pigpio");
import Controller from "node-pid-controller";
import { getGpioNumber } from "raspi-board";
import { scale } from "../helpers/misc";
import pins from "../helpers/pins";

type FlapName = "flapFront" | "flapBack" | "flapLeft" | "flapRight";

const controllerConfig = {
  k_p: 0.25,
  k_i: 0.01,
  k_d: 0.01
};

const sideFlaps = ["flapLeft", "flapRight"];
const invertedFlaps = ["flapFront", "flapRight"];
const rangeOffset = 350; // range in pulses

class Flap {
  public pwm: any;
  public center: number;
  public controller: Controller;
  public isInverted: boolean;
  public isSide: boolean;
  public range: {
    min: number;
    max: number;
  };

  constructor(name: FlapName, offset = 0) {
    const center = 1500 + offset;
    this.range = {
      min: center - rangeOffset,
      max: center + rangeOffset
    };
    const pin = getGpioNumber(pins[name]);
    this.pwm = new Gpio(pin, { mode: Gpio.OUTPUT });
    this.controller = new Controller(controllerConfig);
    this.isSide = sideFlaps.includes(name);
    this.isInverted = invertedFlaps.includes(name);
  }

  public set(value: number) {
    const { min, max } = this.range;
    const pulse = scale(value, -1, 1, min, max);
    this.pwm.servoWrite(Math.round(pulse));
  }

  public update(state: State) {
    // const mainAxis = state.imu.gyro_x
    const joysticAxis = this.isSide
      ? state.joystick.rStickX
      : state.joystick.rStickY;

    // constroller correction
    // const gyroAxis = this.isSide
    //   ? state.imu.gyro_x
    //   : state.imu.gyro_y
    const gyroAxis = 0;
    this.controller.setTarget(joysticAxis); // 120km/h
    const correction = this.controller.update(gyroAxis);

    // const correction = joysticAxis;
    // const { min, max } = this.range;
    // const pulse = scale(correction, -1, 1, min, max);
    // this.pwm.servoWrite(Math.round(pulse));
  }
}

export default Flap;

// import { Servo } from "johnny-five";
// import pins from "../helpers/pins";

// // Varies 40 degrees
// const variance = 40;

// type FlapName = "flapFront" | "flapBack" | "flapLeft" | "flapRight";

// const offsets: Record<FlapName, number> = {
//   flapFront: 0,
//   flapBack: 0,
//   flapLeft: 0,
//   flapRight: 0
// };

// const getFlap = (name: FlapName) =>
//   new Servo({
//     center: true,
//     // @ts-ignore
//     offset: offsets[name],
//     pin: pins[name],
//     range: [90 - variance, 90 + variance]
//   });

// export default () => ({
//   flapFront: getFlap("flapFront"),
//   flapBack: getFlap("flapBack"),
//   flapLeft: getFlap("flapLeft"),
//   flapRight: getFlap("flapRight")
// });
