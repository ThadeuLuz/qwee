import { h, Color } from "ink";

const colors = {
  front: "blue",
  back: "magenta",
  left: "green",
  right: "yellow"
};

// <Color blue> Front: {state.output.flaps.front} </Color>
// <Color magenta> Back {state.output.flaps.back} </Color>
// <Color green> Left {state.output.flaps.left} </Color>
// <Color yellow> Right {state.output.flaps.right} </Color>

const Flap = (props, context) => {
  const { dir } = props;
  const colorProps = {
    [colors[dir]]: true
  };

  return (
    <Color {...colorProps}>
      [{dir}: {context.output.flaps[dir]}]
    </Color>
  );
};

export default Flap;
