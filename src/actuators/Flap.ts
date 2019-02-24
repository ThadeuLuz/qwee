import { State } from "../sensors";
const { Gpio } = process.env.QWEE ? require("pigpio-mock") : require("pigpio");
import Controller from "node-pid-controller";
import { getGpioNumber } from "raspi-board";
import { scale } from "../helpers/misc";
import pins from "../helpers/pins";

type FlapName = "flapFront" | "flapBack" | "flapLeft" | "flapRight";

const controllerConfig = {
  k_p: 0.25,
  k_i: 0.0,
  k_d: 0.0
};

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
  }

  public set(stickValue: number, rotation: number) {
    const correction = this.controller.update(rotation);
    const value = stickValue + correction;

    const { min, max } = this.range;
    const pulse = scale(value, -1, 1, min, max);
    this.pwm.servoWrite(Math.round(pulse));
  }
}

export default Flap;
