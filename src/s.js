const five = require("johnny-five");
const Raspi = require("raspi-io");
const board = new five.Board({
  io: new Raspi(),
  enableSoftPwm: true
});

board.on("ready", function() {
  const servo = new five.Servo("P1-16");
  servo.sweep();
});
