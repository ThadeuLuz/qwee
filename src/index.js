/* eslint-disable no-console */
const Cylon = require("cylon");

const joystickConfig = __dirname + "/joystick.json";
const servoInitial = 90;
const servoRange = 35;

const clampServoAngle = angle => {
  const min = servoInitial - servoRange;
  const max = servoInitial + servoRange;
  if (angle > max) {
    return max;
  }

  if (angle < min) {
    return min;
  }

  return angle;
};

const getServoAngle = (directionPos, rotationPos) => {
  const dirAngle = directionPos * servoRange + servoInitial;
  const rotAngle = rotationPos * servoRange + servoInitial;
  return clampServoAngle(rotAngle + dirAngle);
};

const servoConfig = {
  driver: "servo",
  limits: { bottom: 20, top: 160 },
  connection: "raspi"
};

Cylon.robot()
  .connection("joystick", { adaptor: "joystick" })
  .connection("raspi", { adaptor: "raspi" })

  .device("controller", {
    driver: "joystick",
    config: joystickConfig,
    connection: "joystick"
  })

  //     .-----.
  // br /   b   \ bl
  //   | r  +  l |
  // fr \   f   / fl
  //     '-----'

  .device("servo_f", Object.assign({ pin: 3 }, servoConfig))
  .device("servo_b", Object.assign({ pin: 5 }, servoConfig))
  .device("servo_r", Object.assign({ pin: 7 }, servoConfig))
  .device("servo_l", Object.assign({ pin: 11 }, servoConfig))

  .on("ready", my => {
    const state = {
      servos: {
        servo_f: 90,
        servo_b: 90,
        servo_r: 90,
        servo_l: 90
      }
    };

    // my.controller.setMaxListeners(1000);

    // <->
    my.controller.on("left_x:move", pos => {
      const angle = pos * servoRange + 90;
      // state.servos.servo_l = Math.round(angle);
      // state.servos.servo_r = Math.round(angle);
      my.servo_r.angle(Math.round(angle));
      my.servo_l.angle(Math.round(angle));
    });

    my.controller.on("left_y:move", pos => {
      const angle = pos * servoRange + 90;
      // state.servos.servo_f = Math.round(angle);
      // state.servos.servo_b = Math.round(angle);
      my.servo_f.angle(Math.round(angle));
      my.servo_b.angle(Math.round(angle));
    });

    // setInterval(() => {
    // console.log(state.servos);
    // ["servo_f", "servo_b", "servo_r", "servo_l"].forEach(servoN => {
    //   const servo = my[servoN];
    //   const angle = state.servos[servoN];
    //   if (angle !== servo.currentAngle()) {
    //     servo.angle(angle);
    //   }
    // });
    // }, 15);
  });

Cylon.start();
