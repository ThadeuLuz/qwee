const { Gpio } = process.env.QWEE ? require("pigpio-mock") : require("pigpio");
import { getGpioNumber } from "raspi-board";
import { scale } from "../helpers/misc";
import pins from "../helpers/pins";

type MotorName = "motorTop" | "motorBottom";

class Motor {
  public pwm: any;

  constructor(name: MotorName) {
    const pin = getGpioNumber(pins[name]);
    this.pwm = new Gpio(pin, { mode: Gpio.OUTPUT });
  }

  public set(v: number) {
    const pulseWidth = Math.round(scale(v, 0, 1, 1000, 2000));
    this.pwm.servoWrite(pulseWidth);
  }
}

export default Motor;
