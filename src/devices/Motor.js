const five = require("johnny-five");
const pins = require("../helpers/pins");

const getMotor = pin => {
  const motor = new five.ESC(pin);
  return motor;
};

module.exports = () => {
  return {
    motorTop: getMotor(pins.motorTop)
    // motorBottom: getMotor(pins.motorBottom)
  };
};
