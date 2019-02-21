import ds from "dualshock";
import { scale } from "../helpers/misc";
import { info, warn } from "../sensors/Logger";

export interface JoystickState {
  status: string;
  x: boolean;
  square: boolean;
  triangle: boolean;
  circle: boolean;
  l1: boolean;
  l2: number;
  lStickX: number;
  l3: boolean;
  lStickY: number;
  r1: boolean;
  r2: number;
  rStickY: number;
  rStickX: number;
  r3: boolean;
  hat: boolean;
  up: boolean;
  left: boolean;
  down: boolean;
  right: boolean;
  select: boolean;
  start: boolean;
  ps: boolean;
}

export const joystickState: JoystickState = {
  status: "",
  x: false,
  square: false,
  triangle: false,
  circle: false,
  l1: false,
  l2: 0,
  lStickX: 0,
  l3: false,
  lStickY: 0,
  r1: false,
  r2: 0,
  rStickY: 0,
  rStickX: 0,
  r3: false,
  hat: false,
  up: false,
  left: false,
  down: false,
  right: false,
  select: false,
  start: false,
  ps: false
};

const digitalKeys: Record<string, keyof JoystickState> = {
  cross: "x",
  circle: "circle",
  square: "square",
  triangle: "triangle",

  l1: "l1",
  r1: "r1",
  l3: "l3",
  r3: "r3",

  up: "up",
  down: "down",
  left: "left",
  right: "right",

  pad: "hat",
  select: "select",
  start: "start",
  ps: "ps"
};

const analogKeys: Record<string, keyof JoystickState> = {
  l2: "l2",
  r2: "r2",
  lStickY: "lStickY",
  lStickX: "lStickX",
  rStickY: "rStickY",
  rStickX: "rStickX"
};

export const getJoystickState = () => joystickState;

const dz = 15;
const mid = 255 / 2;

const normalizeStick = (value: number) => {
  if (mid - dz < value && value < mid + dz) {
    return 0;
  }

  return value > mid
    ? scale(value, mid + dz, 255, 0, 1)
    : scale(value, 0, mid - dz, -1, 0);
};

const waitForDevice = (onFail: () => void) => {
  return new Promise(resolve => {
    const attemptConnection = () => {
      const device = ds.getDevices()[0];
      if (device) {
        info("Joystick found");
        resolve(device);
      } else {
        warn("No joystick found. Trying again in 5 second.");
        onFail();
        setTimeout(() => {
          attemptConnection();
        }, 5000);
      }
    };

    attemptConnection();
  });
};

let fails = 0;
const Joystick = async () => {
  const device = await waitForDevice(() => {
    fails = fails + 1;
    joystickState.status = `Failed ${fails} times`;
  });
  const gp = ds.open(device);

  gp.ondigital = (button: string, value: boolean) => {
    const stateKey = digitalKeys[button];
    if (stateKey) {
      joystickState[stateKey] = value;
    }
  };

  gp.onanalog = (axis: string, value: number) => {
    const stateKey = analogKeys[axis];
    if (stateKey) {
      joystickState[stateKey] = value;
    }
  };

  joystickState.status = "OK";
};

export default Joystick;
