import { scale } from "../helpers/misc";
import { getHelpers, getState } from "../sensors";
import { log, printLogs, warn } from "../sensors/Logger";
import Buzzer from "./Buzzer";

let previousState = getState();
let state = getState();

interface Actuators {
  buzzer: Buzzer;
}

export const setup = async () => {
  const buzzer = new Buzzer();
  return { buzzer };
};

export const loop = (actuators: Actuators) => {
  updateActuators(actuators);
  setTimeout(() => {
    loop(actuators);
  }, 50);
};

// Updates actuators
const updateActuators = ({ buzzer }: Actuators) => {
  previousState = state;
  state = getState();
  const { hasChanged, changedTo } = getHelpers(state, previousState);

  printLogs();

  if (state.joystick.square === true) {
    buzzer.play("startup");
  }

  // Play sounds on joystick status changes
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
