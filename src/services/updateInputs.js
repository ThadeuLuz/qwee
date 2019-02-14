import { readJsonSync } from "fs-extra";

const joysticConfig = readJsonSync("./joystick.json");

const axiss = joysticConfig.axis.map(axis => axis.name);

const buttons = joysticConfig.buttons
  .map(button => button.name)
  .filter(buttonName => !["r2", "l2"].includes(buttonName));

export default (qwee, setState) => {
  axiss.forEach(axis => {
    qwee.controller.on(`${axis}:move`, pos => {
      setState({ [`controller_${axis}`]: pos });
    });
  });

  buttons;

  qwee.controller.on("left_x:move", pos => {
    const angle = pos * servoRange + 90;
    // state.servos.servo_l = Math.round(angle);
    // state.servos.servo_r = Math.round(angle);
    my.servo_r.angle(Math.round(angle));
    my.servo_l.angle(Math.round(angle));
  });

  qwee.controller.on("left_y:move", pos => {
    const angle = pos * servoRange + 90;
    // state.servos.servo_f = Math.round(angle);
    // state.servos.servo_b = Math.round(angle);
    my.servo_f.angle(Math.round(angle));
    my.servo_b.angle(Math.round(angle));
  });
};
