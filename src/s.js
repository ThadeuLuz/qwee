const five = require("johnny-five");
const Raspi = require("raspi-io");
const board = new five.Board({
  io: new Raspi()
});

board.on("ready", function() {
  const servo = new five.Servo("P1-16");

  this.repl.inject({
    servo: servo
  });

  servo.sweep();
});
