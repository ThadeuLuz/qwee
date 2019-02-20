import ds from "dualshock";
import { scale } from "../helpers/misc";
import { IState, setState } from "../helpers/state";

const digitalKeys: Record<string, keyof IState> = {
  cross: "joystick_x",
  circle: "joystick_circle",
  square: "joystick_square",
  triangle: "joystick_triangle",

  l1: "joystick_l1",
  r1: "joystick_r1",
  l3: "joystick_l3",
  r3: "joystick_r3",

  up: "joystick_up",
  down: "joystick_down",
  left: "joystick_left",
  right: "joystick_right",

  pad: "joystick_hat",
  select: "joystick_select",
  start: "joystick_start",
  ps: "joystick_ps"
};

const analogKeys: Record<string, keyof IState> = {
  l2: "joystick_l2",
  r2: "joystick_r2",
  lStickY: "joystick_lStickY",
  lStickX: "joystick_lStickX",
  rStickY: "joystick_rStickY",
  rStickX: "joystick_rStickX"
};

const dz = 50;
const mid = 255 / 2;

const normalizeStick = (value: number) => {
  if (mid - dz < value && value < mid + dz) {
    return 0;
  }

  return value > mid
    ? scale(value, mid + dz, 255, 0, 1)
    : scale(value, 0, mid - dz, -1, 0);
};

const waitForDevice = () => {
  return new Promise(resolve => {
    const attemptConnection = () => {
      const device = ds.getDevices()[0];
      if (device) {
        setState({ message: "Joystick found" });
        resolve(device);
      } else {
        setState({ message: "No joystick found. Trying again in 1 second." });
        setTimeout(() => {
          attemptConnection();
        }, 1000);
      }
    };

    attemptConnection();
  });
};

const Joystick = async () => {
  const device = await waitForDevice();
  const gp = ds.open(device);

  gp.ondigital = (button: string, value: boolean) => {
    const stateKey = digitalKeys[button];
    if (stateKey) {
      setState({ [stateKey]: value });
    }
  };

  gp.onanalog = (axis: string, value: number) => {
    const stateKey = analogKeys[axis];
    if (stateKey) {
      if (stateKey.includes("Stick")) {
        setState({ [stateKey]: normalizeStick(value) });
      } else {
        setState({ [stateKey]: scale(value, 0, 255, 0, 1) });
      }
    }
  };
};

export default Joystick;