const five = require("johnny-five");
const pins = require("./pins");

module.exports = () => {
  return new five.Piezo(pins.piezo);
};
