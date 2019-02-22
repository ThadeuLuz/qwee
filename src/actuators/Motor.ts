const { Gpio } = process.env.QWEE ? require("pigpio-mock") : require("pigpio");
import { getGpioNumber } from "raspi-board";
import { scale } from "../helpers/misc";
import pins from "../helpers/pins";

type MotorName = "motorTop" | "motorBottom";

const motor = new Gpio(10, { mode: Gpio.OUTPUT });
motor.servoWrite(1000);

class Motor extends Gpio {
  constructor(name: MotorName) {
    super(getGpioNumber(pins[name]), { mode: Gpio.OUTPUT });
  }

  public set = (v: number) => {
    const pulseWidth = Math.round(scale(v, 0, 1, 1000, 2000));
    this.servoWrite(pulseWidth);
  };
}

export default Motor;
