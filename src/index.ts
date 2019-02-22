import { init } from "raspi";
import { loop, setup } from "./actuators";

init(async () => {
  const actuators = await setup();
  loop(actuators);
});

// import five from "johnny-five";
// // @ts-ignore
// import Raspi from "raspi-io";
// import { loop, setup } from "./actuators";

// const qwee = new five.Board({
//   io: new Raspi({ enableSoftPwm: true })
// });

// // Initialize board
// qwee.on("ready", async () => {
//   const actuators = await setup();
//   loop(actuators);
// });
