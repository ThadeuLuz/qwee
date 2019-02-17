const { log, info } = require("./helpers/console");
const { subscribe } = require("./helpers/state");
const songs = require("./helpers/songs");

// const Joystick = require("./devices/Joystick");
const getPiezo = require("./devices/Piezzo");

subscribe(state => {
  console.clear();
  console.log(JSON.stringify(state, null, 2));
});

const initialize = async () => {
  info("Starting");
  log("Conecting joystick...");

  // const js = await Joystick();
  // js.syncWithState(setState);

  // Joystick ready, play startup song
  const piezo = getPiezo();

  piezo.play({
    song: songs.startup,
    tempo: 100
  });

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
