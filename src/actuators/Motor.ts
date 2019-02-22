import { Servo } from "johnny-five";
import pins from "../helpers/pins";

type MotorName = "motorTop" | "motorBottom";

const getMotor = (name: MotorName) => {
  const motor = new Servo({
    pin: pins[name],
    startAt: 0
  });
  return motor;
};

export default () => ({
  motorTop: getMotor("motorTop"),
  motorBottom: getMotor("motorBottom")
});
