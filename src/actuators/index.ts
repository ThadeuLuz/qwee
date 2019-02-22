import cloneDeep from "lodash.clonedeep";
import { scale } from "../helpers/misc";
import { getHelpers, getState, initialState, printLogs } from "../sensors";
import { error, info, log, warn } from "../sensors/Logger";
import Buzzer from "./Buzzer";

interface Actuators {
  buzzer: Buzzer;
}

export const setup = async () => {
  const buzzer = new Buzzer();
  buzzer.play("startup");
  return { buzzer };
};

export const loop = (actuators: Actuators) => {
  updateActuators(actuators);
  setTimeout(() => {
    loop(actuators);
  }, 100);
};

// Updates actuators
let previousState = cloneDeep(initialState);
let state = cloneDeep(initialState);

const updateActuators = ({ buzzer }: Actuators) => {
  previousState = cloneDeep(state);
  state = cloneDeep(getState());

  const { hasChanged, changedTo } = getHelpers(state, previousState);
  printLogs();
  error("xx: ", `${previousState.joystick.x}`, `${state.joystick.x}`);

  if (hasChanged("joystick", "x")) {
    buzzer.play("startup");
    info("AAA: ", state.joystick.status);
  }

  // Play sounds on joystick status changes
  if (previousState.joystick.status !== state.joystick.status) {
    info("BBB: ", state.joystick.status);
  }

  if (hasChanged("joystick", "status")) {
    warn("Status Changed: ", state.joystick.status);
    // if ( === "OK") {
    // buzzer.play("startup");
    // } else {
    // buzzer.play("ops");
    // }
  }

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
    const throttle = scale(state.joystick.r2, 10, 255, 1000, 2000);
    log(`Throttle: ${throttle}`);
  }
};
