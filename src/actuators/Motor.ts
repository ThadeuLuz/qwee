import { Servo } from "johnny-five";
import { scale } from "../helpers/misc";
import pins from "../helpers/pins";

type MotorName = "motorTop" | "motorBottom";

class Motor extends Servo {
  constructor(name: MotorName) {
    super({
      pin: pins[name],
      startAt: 0,
      range: [0, 180]
    });
  }

  public set(value: number) {
    this.to(Math.round(scale(value, 0, 1, 0, 180)));
  }
}

export default Motor;

// const getMotor = (name: MotorName) => {
//   const motor = new Servo({
//     pin: pins[name],
//     startAt: 0,
//     range: [0, 180]
//   });
//   return motor;
// };

// export default () => ({
//   motorTop: getMotor("motorTop"),
//   motorBottom: getMotor("motorBottom")
// });
