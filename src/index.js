import joystick from "./services/joystick";
import { subscribe } from "./services/state";

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
