const { log, info, warn } = require("./console");
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
    l2: "joystick_axisl2",
    r2: "joystick_axisr2",
    lStickY: "joystick_lStickY",
    lStickX: "joystick_lStickX",
    rStickY: "joystick_rStickY",
    rStickX: "joystick_rStickX"
  }
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

  log("Found device", JSON.stringify(device));
  const gp = ds.open(device);

  // Set js color green
  gp.setLed(0, 255, 0);

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
        setState({ [stateKey]: value });
      }
    };
  };

  return { syncWithState };
};
