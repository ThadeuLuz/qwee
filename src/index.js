const { log, info } = require("./helpers/console");
const { subscribe, setState } = require("./helpers/state");

const Joystick = require("./devices/Joystick");
const getPiezo = require("./devices/Piezzo");

subscribe(state => {
  console.clear();
  console.log(JSON.stringify(state, null, 2));
});

const initialize = async () => {
  info("Starting");
  log("Conecting joystick...");

  const js = await Joystick();
  js.syncWithState(setState);

  // Joystick ready, play startup song
  const piezo = getPiezo();

  piezo.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
    song: [
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["A4", 1 / 4],
      [null, 1 / 4],
      ["A4", 1],
      ["G4", 1],
      [null, 1 / 2],
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["G4", 1 / 4],
      [null, 1 / 4],
      ["G4", 1],
      ["F4", 1],
      [null, 1 / 2]
    ],
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
