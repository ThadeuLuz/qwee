import { robot, start } from "cylon";

const joystickConfig = __dirname + "/joystick.json";
const servoConfig = {
  driver: "servo",
  limits: { bottom: 20, top: 160 },
  connection: "raspi"
};

const initialize = () =>
  new Promise(resolve => {
    robot()
      .connection("joystick", { adaptor: "joystick" })
      .connection("raspi", { adaptor: "raspi" })
      .device("controller", {
        driver: "joystick",
        config: joystickConfig,
        connection: "joystick"
      })
      .device("servo_f", Object.assign({ pin: 3 }, servoConfig))
      .device("servo_b", Object.assign({ pin: 5 }, servoConfig))
      .device("servo_r", Object.assign({ pin: 7 }, servoConfig))
      .device("servo_l", Object.assign({ pin: 11 }, servoConfig))
      .on("ready", qwee => resolve(qwee));
    start();
  });

export default initialize;
