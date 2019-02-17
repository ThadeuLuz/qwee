const state = {
  joystick_x: false,
  joystick_square: false,
  joystick_triangle: false,
  joystick_circle: false,
  joystick_l1: false,
  joystick_l2: 0,
  joystick_lStickX: 0,
  joystick_l3: false,
  joystick_lStickY: 0,
  joystick_r1: false,
  joystick_r2: 0,
  joystick_rStickY: 0,
  joystick_rStickX: 0,
  joystick_r3: false,
  joystick_hat: false,
  joystick_up: false,
  joystick_left: false,
  joystick_down: false,
  joystick_right: false,
  joystick_select: false,
  joystick_start: false,
  joystick_ps: false
};

const onChange = [];

exports.getState = () => state;

exports.setState = changes => {
  Object.keys(changes).forEach(key => {
    state[key] = changes[key];
  });
  onChange.forEach(fn => {
    fn(state, changes);
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
