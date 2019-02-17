const { log, info, warn } = require("../helpers/console");
const ds = require("dualshock");

const stateKeys = {
  digital: {
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
  },
  analog: {
    l2: "joystick_l2",
    r2: "joystick_r2",
    lStickY: "joystick_lStickY",
    lStickX: "joystick_lStickX",
    rStickY: "joystick_rStickY",
    rStickX: "joystick_rStickX"
  }
};

const dz = 10;
const mid = 255 / 2;
const normalize = v => {
  if (mid - dz < v && v < mid + dz) {
    return 0;
  }
  return v / mid - 1;
};

const waitForDevice = () => {
  return new Promise(resolve => {
    const attemptConnection = () => {
      const device = ds.getDevices()[0];
      if (device) {
        info("Joystick found");
        resolve(device);
      } else {
        warn("No joystick found. Trying again in 1 second.");
        setTimeout(() => {
          attemptConnection();
        }, 1000);
      }
    };

    attemptConnection();
  });
};

module.exports = async () => {
  const device = await waitForDevice();

  log("Found device");
  const gp = ds.open(device);

  // Set js color green
  // const x = true;
  // setInterval(() => {
  //   const l = [
  //     Math.floor(Math.random() * 255),
  //     Math.floor(Math.random() * 255),
  //     Math.floor(Math.random() * 255)
  //   ];
  //   log(l);
  //   gp.setLed(...l);
  // }, 2000);
  // gp.setLed(255, 0, 0);
  gp.rumble(255, 255, 1, 1);
  // gp.setLed(0, 255, 0);
  // setTimeout(() => {
  //   gp.setLed(
  //     Math.floor(Math.random() * 255),
  //     Math.floor(Math.random() * 255),
  //     Math.floor(Math.random() * 255)
  //   );
  // }, 2000);

  const syncWithState = setState => {
    gp.ondigital = (button, value) => {
      const stateKey = stateKeys.digital[button];
      if (stateKey) {
        setState({ [stateKey]: value });
      }
    };

    gp.onanalog = (axis, value) => {
      const stateKey = stateKeys.analog[axis];
      if (stateKey) {
        if (stateKey.includes("Stick")) {
          setState({ [stateKey]: normalize(value) });
        } else {
          setState({ [stateKey]: value });
        }
      }
    };
  };

  return { syncWithState };
};
