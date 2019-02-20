import five from "johnny-five";
// @ts-ignore
import Raspi from "raspi-io";

import Joystick from "./devices/Joystick";
import Motor from "./devices/Motor";
import Piezo from "./devices/Piezo";
import { songs } from "./helpers/emotion";
import { scale } from "./helpers/misc";
import { getHelpers, IState, setState, subscribe } from "./helpers/state";

const qwee = new five.Board({
  io: new Raspi({ enableSoftPwm: true })
});

qwee.on("ready", async () => {
  // Initialize board
  setState({ message: "Connecting Joystick..." });
  await Joystick();
  const piezo = Piezo();

  piezo.play(songs.startup);

  setState({ message: "Inicializado!" });
  const { motorTop } = Motor();

  // React to changes
  subscribe((state: IState, oldState: IState) => {
    const { hasChanged, changedTo } = getHelpers(state, oldState);

    if (changedTo("joystick_x", true)) {
      console.log("x pressed");
    }

    if (hasChanged("joystick_r2")) {
      // @ts-ignore
      const [tmin, tmax] = motorTop.pwmRange || motorTop.range;
      const throttle = scale(state.joystick_r2, 10, 255, tmin, tmax);
      console.log("throttle", throttle);
      // motorTop.throttle(throttle);
    }
  });
});

//   if (settings.piezo) {
//     qwee.repl.inject({ piezo });
//   }

//   if (settings.motors) {
//   }

//   // Reactions to state changes
//   const reactToStateChanges = (state, oldState, { wasPressed }) => {
//     // Buzz if x is pressed
//     if (piezo && joystick) {
//       if (state.joystick_x === true && oldState.joystick_x === false) {
//         piezo.frequency(587, 1000);
//         setTimeout(() => {
//           piezo.off();
//         }, 1000);
//       }
//     }

//     const [tmin, tmax] = motorTop.pwmRange;
//     const throttle = scale(state.joystick_r2, 10, 255, tmin, tmax);
//     console.log("motor", motorTop.pwmRange, throttle);
//     motorTop.throttle(throttle);
//   };

//   state.subscribe(reactToStateChanges);

//   // js.setState =

//   // info("info");
//   // warn("warn");
//   // error("error");
//   // await js.initialize();
//   // js.updateState()
//   // const js = await joystick();
//   // js.onChange();
//   // this.setJoystickExtras = js.setExtras;
// });
