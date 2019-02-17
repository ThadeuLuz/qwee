const { ESC } = require("johnny-five");

const pins = require("../helpers/pins");

const getMotor = pin => {
  const motor = new ESC(pin);
  motor.speed(0);
  return motor;
};

module.exports = async () => {
  return {
    motorTop: getMotor(pins.motorTop)
    // motorBottom: getMotor(pins.motorBottom)
  };
};
