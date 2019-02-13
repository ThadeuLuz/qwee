import { h, Color, Component } from "ink";
import Flap from "./components/Flap";

class QWee extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        distaces: {
          frontLeft: 0,
          frontRight: 0,
          backLeft: 0,
          backRight: 0
        },
        gps: [0, 0],
        height: 0,
        joystick: {}
      },
      output: {
        flaps: {
          left: 0,
          right: 0,
          front: 0,
          back: 0
        },
        rotations: {
          x: 0,
          y: 0,
          z: 0
        },
        motors: {
          top: 0,
          bottom: 0
        },
        eyes: []
      }
    };
  }

  getChildContext = () => {
    return {
      output: this.state.output,
      input: this.state.input,
      setState: this.setState
    };
  };

  render(_, state) {
    const a = 110;

    return (
      <>
        <>
          Flaps:
          <Flap dir="front" />
          <Flap dir="back" />
          <Flap dir="left" />
          <Flap dir="right" />
        </>
      </>
    );
  }
}

export default QWee;
