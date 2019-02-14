const joystick = require("./services/joystick");
const { subscribe } = require("./services/state");

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
