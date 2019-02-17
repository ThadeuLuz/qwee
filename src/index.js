const { log, info, hasChanged } = require("./helpers/misc");
const state = require("./helpers/state");
const songs = require("./helpers/songs");

const Joystick = require("./devices/Joystick");
const qwee = require("./devices/QWee");
const getPiezo = require("./devices/Piezzo");
const Motor = require("./devices/Motor");

state.subscribe(state => {
  console.clear();
  console.log(JSON.stringify(state, null, 2));
});

qwee.on("ready", async () => {
  info("Starting");
  log("Conecting joystick...");

  const js = await Joystick();
  js.syncWithState(state.setState);

  // Joystick ready, play beep
  const piezo = getPiezo();
  qwee.repl.inject({ piezo });

  const { motorTop } = await Motor();

  // Reactions to state changes
  const reactToStateChanges = (state, oldState) => {
    if (state.joystick_x === true && oldState.joystick_x === false) {
      piezo.frequency(800, 500);
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
