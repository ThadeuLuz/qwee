import five from "johnny-five";
// @ts-ignore
import Raspi from "raspi-io";
import { setup, update } from "./actuators";

const qwee = new five.Board({
  io: new Raspi({ enableSoftPwm: true })
});

// Initialize board
qwee.on("ready", async () => {
  const actuators = await setup();

  const loop = () => {
    update(actuators);
    setTimeout(() => {
      loop();
    }, 500);
  };

  loop();
});
