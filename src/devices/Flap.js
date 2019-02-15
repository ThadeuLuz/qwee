const { Servo } = require("johnny-five");

// Varies 40 degrees
const variance = 40;

module.exports = (pin, offset, invert) => {
  return new Servo({
    center: true,
    invert,
    offset,
    pin,
    range: [90 - variance, 90 + variance]
  });
};
