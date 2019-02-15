// const Raspi = require("raspi-io");
// const { Board } = require("johnny-five");
// const makeFlap = require("./devices/Flap");

// const qwee = new Board({
//   io: new Raspi()
// });

// qwee.on("ready", () => {
//   // const flap_left = makeFlap();
// });

const joystick = require("./devices/joystick");
const { subscribe } = require("./devices/state");

subscribe(state => {
  console.clear();
  console.log(state);
});

const initialize = async () => {
  const js = await joystick();
  js.onChange();
  this.setJoystickExtras = js.setExtras;
};

initialize();
