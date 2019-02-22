import cloneDeep from "lodash.clonedeep";
// @ts-ignore
import { scale } from "../helpers/misc";
import { getHelpers, getState, initialState, printLogs } from "../sensors";
import { info, log } from "../sensors/Logger";
import Buzzer from "./Buzzer";
// import Flap from "./Flap";
import Motor from "./Motor";

interface Actuators {
  buzzer: Buzzer;
  motorTop: any;
  // motorBottom: Servo;
  // flapFront: Servo;
  // flapBack: Servo;
  // flapLeft: Servo;
  // flapRight: Servo;
}

export const setup = async (): Promise<Actuators> => {
  const buzzer = new Buzzer();
  const { motorTop } = Motor();
  // const { flapFront, flapBack, flapLeft, flapRight } = Flap();
  return {
    buzzer,
    motorTop
    // motorBottom,
    // flapFront,
    // flapBack,
    // flapLeft,
    // flapRight
  };
};

export const loop = (actuators: Actuators) => {
  updateActuators(actuators);
  setTimeout(() => {
    loop(actuators);
  }, 1);
};

let previousState = initialState;
let state = initialState;
let loopCount = 0;

// Updates actuators
const updateActuators = ({ buzzer, motorTop }: Actuators) => {
  previousState = cloneDeep(state);
  state = cloneDeep(getState());
  loopCount = loopCount + 1;

  const { hasChanged, changedTo } = getHelpers(state, previousState);
  if (loopCount % 50 === 0) {
    printLogs();
    console.log(loopCount);
  }

  if (hasChanged("joystick", "x")) {
    info("X changed");
  }

  if (changedTo("joystick", "x", true)) {
    log("X pressed");
  }

  // if (hasChanged("joystick", "status")) {
  //   warn("Status Changed: ", state.joystick.status);
  //   if (state.joystick.status === "OK") {
  //     info("Joystick initialized");
  //     buzzer.play("startup");
  //   } else {
  //     warn("Joystick not found", state.joystick.status);
  //     buzzer.play("ops");
  //   }
  // }

  // Break out if joystick is not present
  if (state.joystick.status !== "OK") {
    return;
  }

  if (changedTo("joystick", "x", true)) {
    buzzer.play("yay");
  }

  if (hasChanged("joystick", "r2")) {
    // const [tmin, tmax] = motorTop.pwmRange || motorTop.range;
    // const [tmin, tmax] = motorTop.pwmRange || motorTop.range;
    const speed = Math.round(scale(state.joystick.r2, 10, 255, 0, 3000));
    log(`Speed: ${speed}`);
    motorTop.servoWrite(speed);
  }
};
