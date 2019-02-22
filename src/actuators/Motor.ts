// @ts-ignore
// import { SoftPWM } from "raspi-soft-pwm";
import { Gpio } from "pigpio";
// import pins from "../helpers/pins";

type MotorName = "motorTop" | "motorBottom";

const getMotor = (name: MotorName) => {
  // const motor = new SoftPWM(pins[name]);
  const motor = new Gpio(23, { mode: Gpio.OUTPUT });

  return motor;
};

export default () => ({
  motorTop: getMotor("motorTop")
  // motorBottom: getMotor("motorBottom")
});
