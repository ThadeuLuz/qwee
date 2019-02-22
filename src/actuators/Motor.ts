// @ts-ignore
import { SoftPWM } from "raspi-soft-pwm";
import pins from "../helpers/pins";

type MotorName = "motorTop" | "motorBottom";

const getMotor = (name: MotorName) => {
  const motor = new SoftPWM(pins[name]);
  return motor;
};

export default () => ({
  motorTop: getMotor("motorTop"),
  motorBottom: getMotor("motorBottom")
});
