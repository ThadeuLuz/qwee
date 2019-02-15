const { log, info, warn } = require("./console");
const ds = require("dualshock");

const stateKeys = {
  digital: {
    cross: "joystick_x",
    circle: "joystick_circle",
    square: "joystick_square",
    triangle: "joystick_triangle",
    // pad: "joystick_hat",
    select: "joystick_select",
    start: "joystick_start",
    l1: "joystick_l1",
    r1: "joystick_r1"
  },
  analog: {
    l2: "joystick_axisl2",
    r2: "joystick_axisr2"
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
  // gp.setLed(0, 255, 0);

  const syncWithState = setState => {
    gp.ondigital = (button, value) => {
      const stateKey = stateKeys.digital[button];
      if (stateKey) {
        setState({ [stateKey]: value });
      } else if (stateKey !== false) {
        stateKeys.digital[button] = false;
        warn(`Botão não rastreada: ${button}`);
      }
    };

    gp.onanalog = (axis, value) => {
      const stateKey = stateKeys.analog[axis];
      if (stateKey) {
        setState({ [stateKey]: value });
      } else if (stateKey !== false) {
        stateKeys.analog[axis] = false;
        warn(`Eixo não rastreado: ${axis}`);
      }
    };
  };

  return { syncWithState };
};
