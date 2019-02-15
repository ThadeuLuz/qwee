const state = {
  joystick_l1: 0,
  joystick_l2: 0
};

const onChange = [];

exports.getState = () => state;

exports.setState = updates => {
  state = Object.assign({}, state, updates);
  onChange.forEach(fn => {
    fn(state);
  });
};

exports.subscribe = fn => {
  onChange.push(fn);
  return () => {
    const index = onChange.indexOf(fn);
    if (index > -1) {
      onChange.splice(index, 1);
    }
  };
};
