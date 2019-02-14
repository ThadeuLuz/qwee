const dualShock = require("dualshock-controller");
const { setState } = require("./state");

let attempts = 0;

const getJoystick = () =>
  new Promise(resolve => {
    const attempt = () => {
      attempts = attempts + 1;
      console.log("Tentando pegar joystick", attempts);
      try {
        const joystick = dualShock({
          config: "dualshock4-alternate-driver"
        });
        resolve(joystick);
      } catch (_) {
        setTimeout(() => {
          attempt();
        }, 2000);
      }
    };

    attempt();
  });

const initialize = async () => {
  const joystick = await getJoystick();

  // joystick.on("error", err => console.log(err));
  joystick.on("connected", () => setState({ joystickReady: true }));

  const move = ["left", "right"];
  move.forEach(axis => {
    joystick.on(`${axis}:move`, ({ x, y }) =>
      setState({ [`joystick_${axis}_x`]: x, [`joystick_${axis}_y`]: y })
    );
  });

  const pressRelease = [
    "dpadright",
    "dpadleft",
    "dpadup",
    "dpaddown",
    "x",
    "circle",
    "square",
    "triangle",
    "l1",
    "r1",
    "leftAnalogBump",
    "rightAnalogBump",
    "psxButton",
    "touchPad"
  ];
  pressRelease.forEach(button => {
    joystick.on(`${button}:press`, () =>
      setState({ [`joystick_${button}`]: true })
    );
    joystick.on(`${button}:release`, () =>
      setState({ [`joystick_${button}`]: false })
    );
  });

  const analogs = ["r2", "l2"];

  analogs.forEach(analog => {
    joystick.on(`${analog}:analog`, d =>
      setState({ [`joystick_${analog}`]: d })
    );
  });

  const motions = ["rightLeft", "forwardBackward", "upDown"];

  motions.forEach(motion => {
    joystick.on(`${motion}:motion`, d =>
      setState({ [`joystick_${motion}`]: d })
    );
  });

  // const setExtras = joystick.setExtras;
  // controller.setExtras({
  //   rumbleLeft: 0, // 0-255 (Rumble left intensity)
  //   rumbleRight: 0, // 0-255 (Rumble right intensity)
  //   red: 0, // 0-255 (Red intensity)
  //   green: 75, // 0-255 (Blue intensity)
  //   blue: 225, // 0-255 (Green intensity)
  //   flashOn: 40, // 0-255 (Flash on time)
  //   flashOff: 10 // 0-255 (Flash off time)
  // });

  return joystick.setExtras;
};

module.exports = initialize;
