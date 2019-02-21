import five from "johnny-five";
// @ts-ignore
import Raspi from "raspi-io";

import Buzzer from "./devices/Buzzer";
import Joystick from "./devices/Joystick";
// import Motor from "./devices/Motor";

// import { scale } from "./helpers/misc";
import { getHelpers, getState, initialState } from "./helpers/state";

const qwee = new five.Board({
  io: new Raspi({ enableSoftPwm: true })
});

const messages = Array(10).fill("-");
const log = (message: string) => {
  messages.shift();
  messages.push(message);
};

// Initialize board
qwee.on("ready", async () => {
  // Initialize buzzer
  const buzzer = new Buzzer();
  buzzer.play("startup");

  // Initialize Joystick
  console.log("Connecting joystick");
  await Joystick(() => {
    buzzer.play("ops");
  });
  buzzer.play("yay");

  // piezo.play(melodies.startup);
  // const { motorTop } = Motor();

  let previousState = initialState;
  let state = initialState;

  // React to changes
  const updateLoop = () => {
    previousState = state;
    state = getState();

    // Print state and messages to console
    console.clear();
    console.log(state);
    messages.forEach(m => console.log(m));

    const { hasChanged, changedTo } = getHelpers(state, previousState);

    if (changedTo("joystick_x", true)) {
      buzzer.play("yay");
    }

    if (hasChanged("joystick_r2")) {
      // @ts-ignore
      // const [tmin, tmax] = motorTop.pwmRange || motorTop.range;
      // const [tmin, tmax] = motorTop.pwmRange || motorTop.range;
      const throttle = scale(state.joystick_r2, 10, 255, 1000, 2000);
      log(`${throttle}`);
    }

    setTimeout(() => {
      // update again
      updateLoop();
    }, 500);
  };

  // Start loop
  updateLoop();
});
