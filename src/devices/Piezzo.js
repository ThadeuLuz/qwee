const five = require("johnny-five");
const pins = require("../helpers/pins");

module.exports = () => {
  return new five.Piezo(pins.piezo);
};
