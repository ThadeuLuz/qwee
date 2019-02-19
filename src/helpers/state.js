// let state = {

// };

// let listeners = [];

// exports.getState = () => state;

// exports.setState = changes => {
//   const oldState = Object.assign({}, state);
//   state = Object.assign({}, state, changes);

//   listeners.forEach(listener => {
//     listener({ state, oldState });
//   });
// };

// exports.subscribe = listener => {
//   listeners.push(listener);
// };

// exports.unsubscribe = listener => {
//   listeners = listeners.filter(l => listener !== l);
// };

// const changed = (state, oldState, prop) => {
//   return state[prop] !== oldState[prop];
// };
// exports.changed = changed;

// const changedTo = (state, oldState, prop, value) => {
//   return changed(state, oldState, prop) && state[prop] === value;
// };
// exports.changedTo = changedTo;
