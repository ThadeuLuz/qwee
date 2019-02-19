import five from "johnny-five";
// @ts-ignore
import Raspi from "raspi-io";

// import { info, log, scale } from "./helpers/misc.js";
import Joystick from "./devices/Joystick";
import Piezo from "./devices/Piezo";
import { getState, setState, subscribe } from "./helpers/state";

subscribe(() => {
  console.clear();
  console.log(getState());
});

const qwee = new five.Board({
  io: new Raspi({ enableSoftPwm: true })
});

qwee.on("ready", async () => {
  // Initialize board
  setState({ message: "Connecting Joystick..." });
  await Joystick();
  const piezo = Piezo();
});

//   if (settings.piezo) {
//     qwee.repl.inject({ piezo });
//   }

//   if (settings.motors) {
//     const { motorTop } = getMotor();
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
