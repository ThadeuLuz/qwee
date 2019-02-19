import five from "johnny-five";
import pins from "../helpers/pins";

export default () => {
  // @ts-ignore
  return new five.Piezo(pins.piezo);
};
