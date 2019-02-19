import { Servo } from "johnny-five";
import pins from "../helpers/pins";

// Varies 40 degrees
const variance = 40;

type FlapName = "flapFront" | "flapBack" | "flapLeft" | "flapRight";

const offsets: Record<FlapName, number> = {
  flapFront: 0,
  flapBack: 0,
  flapLeft: 0,
  flapRight: 0
};

const getFlap = (name: FlapName) =>
  new Servo({
    center: true,
    // @ts-ignore
    offset: offsets[name],
    pin: pins[name],
    range: [90 - variance, 90 + variance]
  });

module.exports = () => ({
  flapFront: getFlap("flapFront"),
  flapBack: getFlap("flapBack"),
  flapLeft: getFlap("flapLeft"),
  flapRight: getFlap("flapRight")
});
