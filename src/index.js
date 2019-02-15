const { log, info } = require("./devices/console");
const Joystick = require("./devices/joystick");
const { subscribe } = require("./devices/state");

subscribe(state => {
  console.clear();
  console.log(state);
});

const initialize = async () => {
  info("Starting");
  log("Conecting joystick...");
  const js = await Joystick();
  js.syncWithState(() => {});

  // js.setState =

  // info("info");
  // warn("warn");
  // error("error");
  // await js.initialize();
  // js.updateState()
  // const js = await joystick();
  // js.onChange();
  // this.setJoystickExtras = js.setExtras;
};

initialize();
