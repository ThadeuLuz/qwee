import { loop, setup } from "./actuators";

const start = async () => {
  const actuators = await setup();
  loop(actuators);
};

start();

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
