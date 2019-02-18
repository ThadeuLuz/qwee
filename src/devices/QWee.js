const five = require("johnny-five");
const Raspi = require("raspi-io");

module.exports = new five.Board({
  io: new Raspi(),
  enableSoftPwm: true
});
