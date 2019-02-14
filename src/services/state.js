let state = {};
const onChange = [];

export const subscribe = fn => {
  onChange.push(fn);
  return () => {
    const index = onChange.indexOf(fn);
    if (index > -1) {
      onChange.splice(index, 1);
    }
  };
};

export const setState = updates => {
  state = Object.assign({}, state, updates);
  onChange.forEach(fn => {
    fn(state);
  });
};

export const getState = () => state;
