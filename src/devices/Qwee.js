const { Board } = require("johnny-five");
const Raspi = require("raspi-io");
const board = new Board({
  io: new Raspi()
});

board.on("ready", function() {
  // const led = new five.Led("P1-13");
});
