let state = {};
const onChange = [];

const subscribe = fn => {
  onChange.push(fn);
  return () => {
    const index = onChange.indexOf(fn);
    if (index > -1) {
      onChange.splice(index, 1);
    }
  };
};

const setState = updates => {
  state = Object.assign({}, state, updates);
  onChange.forEach(fn => {
    fn(state);
  });
};

const getState = () => state;

module.exports = {
  setState,
  subscribe,
  getState
};
