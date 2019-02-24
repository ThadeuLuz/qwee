const { Gpio } = process.env.QWEE ? require("pigpio-mock") : require("pigpio");
import { getGpioNumber } from "raspi-board";
import { scale } from "../helpers/misc";
import pins from "../helpers/pins";

type SR04Name =
  | "sr04FrontLeft"
  | "sr04FrontRight"
  | "sr04BackLeft"
  | "sr04BackRight";

// Sound Speed constant
const MICROSECDONDS_PER_CM = 1e6 / 34321;

class SR04 {
  public pwmEcho: any;
  public pwmTrig: any;
  public startTick: number;

  constructor(name: SR04Name, onDistance: (distance: number) => void) {
    const pinEcho = getGpioNumber(pins[name]);
    const pinTrig = getGpioNumber(pins[name]);
    this.pwmTrig = new Gpio(pinTrig, { mode: Gpio.OUTPUT });
    this.pwmEcho = new Gpio(pinEcho, { mode: Gpio.INPUT, alert: true });

    this.pwmEcho.on("alert", (level: any, tick: any) => {
      if (level === 1) {
        this.startTick = tick;
      } else {
        const endTick = tick;
        // Unsigned 32 bit arithmetic
        const diff = (endTick >> 0) - (this.startTick >> 0);
        const distanceInCm = diff / 2 / MICROSECDONDS_PER_CM;
        onDistance(distanceInCm);
      }
    });
  }

  public getDistance() {
    // Set trigger high for 10 microseconds
    this.pwmTrig.trigger(10, 1);
  }
}

export default SR04;
