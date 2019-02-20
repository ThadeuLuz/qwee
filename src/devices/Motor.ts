import { ESC } from "johnny-five";
import pins from "../helpers/pins";

type MotorName = "motorTop" | "motorBottom";

const getMotor = (name: MotorName) => {
  const motor = new ESC(pins[name]);
  return motor;
};

export default () => ({
  motorTop: getMotor("motorTop"),
  motorBottom: getMotor("motorBottom")
});