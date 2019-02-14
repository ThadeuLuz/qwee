import { h, Color, Component } from "ink";
import Console from "ink-console";

// import initialize from "./services/initialize";
import initialState from "./services/initialState";
// import updateInputs from "./services/updateInputs";

// import getJoystick from "./services/joystick";

import Flap from "./components/Flap";

class QWee extends Component {
  state = initialState;

  componentDidMount = async () => {
    // const joystick = await getJoystick();
    // try {
    //   const joystick = initializeJoystick();
    //   joystick.watchChanges(this.setState);
    // } catch {
    //   return "erro";
    // }
  };

  // componentWillUpdate = (_, newState) => {
  // const oldState = this.state;
  // reactToChanges(oldState, newState, this.qwee);
  // };

  getChildContext = () => ({
    output: this.state.output,
    input: this.state.input,
    setState: this.setState
  });

  render(_, state) {
    if (!state.ready) {
      return <Color>Inicializando...</Color>;
    }

    return (
      <>
        Flaps:
        <Flap dir="front" />
        <Flap dir="back" />
        <Flap dir="left" />
        <Flap dir="right" />
        <div>
          <Console lines={4} />
        </div>
      </>
    );
  }
}

export default QWee;
