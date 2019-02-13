import initialize from "./services/initialize";

const state = {
  servos: {
    servo_f: 90,
    servo_b: 90,
    servo_r: 90,
    servo_l: 90
  }
};

const x = async () => {
  const qwee = await initialize();

  // qwee.controller.setMaxListeners(1000);

  // <->
  qwee.controller.on("left_x:move", pos => {
    const angle = pos * servoRange + 90;
    // state.servos.servo_l = Math.round(angle);
    // state.servos.servo_r = Math.round(angle);
    qwee.servo_r.angle(Math.round(angle));
    qwee.servo_l.angle(Math.round(angle));
  });

  qwee.controller.on("left_y:move", pos => {
    const angle = pos * servoRange + 90;
    // state.servos.servo_f = Math.round(angle);
    // state.servos.servo_b = Math.round(angle);
    qwee.servo_f.angle(Math.round(angle));
    qwee.servo_b.angle(Math.round(angle));
  });

  // setInterval(() => {
  // console.log(state.servos);
  // ["servo_f", "servo_b", "servo_r", "servo_l"].forEach(servoN => {
  //   const servo = qwee[servoN];
  //   const angle = state.servos[servoN];
  //   if (angle !== servo.currentAngle()) {
  //     servo.angle(angle);
  //   }
  // });
  // }, 15);
};
