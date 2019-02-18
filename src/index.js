const { log, info } = require("./helpers/misc");
const state = require("./helpers/state");

const qwee = require("./devices/QWee");
const getJoystick = require("./devices/Joystick");
const getPiezo = require("./devices/Piezzo");
// const getMotor = require("./devices/Motor");

setInterval(() => {
  console.clear();
  console.log(JSON.stringify(state.getState(), null, 2));
}, 200);

qwee.on("ready", async () => {
  info("Starting");
  log("Conecting joystick...");

  const js = await getJoystick();
  js.syncWithState(state.setState);

  // Joystick ready, play beep
  const piezo = getPiezo();
  qwee.repl.inject({ piezo });

  // const { motorTop } = await getMotor();

  // Reactions to state changes
  const reactToStateChanges = (state, oldState) => {
    if (state.joystick_x === true && oldState.joystick_x === false) {
      console.log("aer");
      piezo.frequency(587, 1000);
    }
  };

  state.subscribe(reactToStateChanges);

  // js.setState =

  // info("info");
  // warn("warn");
  // error("error");
  // await js.initialize();
  // js.updateState()
  // const js = await joystick();
  // js.onChange();
  // this.setJoystickExtras = js.setExtras;
});
