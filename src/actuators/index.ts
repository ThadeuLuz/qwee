import cloneDeep from "lodash.clonedeep";
// @ts-ignore
import { scale } from "../helpers/misc";
import { getHelpers, getState, initialState, printLogs } from "../sensors";
import { info, warn } from "../sensors/Logger";
import Buzzer from "./Buzzer";
import Flap from "./Flap";
import Motor from "./Motor";

interface Actuators {
  buzzer: Buzzer;
  motorTop: Motor;
  motorBottom: Motor;
  flapFront: Flap;
  flapBack: Flap;
  // flapLeft: Flap;
  // flapRight: Flap;
}

export const setup = async (): Promise<Actuators> => ({
  buzzer: new Buzzer(),
  motorTop: new Motor("motorTop"),
  motorBottom: new Motor("motorBottom"),
  flapFront: new Flap("flapFront"),
  flapBack: new Flap("flapBack")
  // flapLeft,
  // flapRight
});

export const loop = (actuators: Actuators) => {
  updateActuators(actuators);
  setTimeout(() => {
    loop(actuators);
  }, 10);
};

let previousState = initialState;
let state = initialState;
let loopCount = 0;

// Updates actuators
const updateActuators = ({
  buzzer,
  motorTop,
  motorBottom,
  flapFront,
  flapBack
}: // flapLeft,
// flapRight
Actuators) => {
  previousState = cloneDeep(state);
  state = cloneDeep(getState());
  loopCount = loopCount + 1;

  const { hasChanged, changedTo } = getHelpers(state, previousState);
  if (loopCount % 50 === 0) {
    printLogs();
    console.log(loopCount);
  }

  if (hasChanged("joystick", "status")) {
    if (state.joystick.status === "OK") {
      info("Joystick initialized");
      buzzer.play("startup");
    } else {
      warn("Joystick not found", state.joystick.status);
      buzzer.play("ops");
    }
  }

  // Break out if joystick is not present
  if (state.joystick.status !== "OK") {
    return;
  }

  if (changedTo("joystick", "x", true)) {
    buzzer.play("yay");
  }

  // Update Motors
  if (hasChanged("joystick", "r2")) {
    const topSpeed = scale(state.joystick.r2, 10, 255, 0, 1);
    motorTop.set(topSpeed);
  }

  if (hasChanged("joystick", "l2")) {
    const bottomSpeed = scale(state.joystick.l2, 10, 255, 0, 1);
    motorBottom.set(bottomSpeed);
  }

  // Update Flaps
  flapFront.set(state.joystick.lStickX);
  // flapBack.set(state.joystick.lStickX);
  // flapLeft.set(state.joystick.lStickY);
  // flapRight.set(state.joystick.lStickY);
};
