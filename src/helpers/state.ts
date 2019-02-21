// export interface State {
//   joystick: any;
// }

// export const initialState: State = {};

// type Subscription = (
//   state: State,
//   previousState: State,
//   helpers: Helpers
// ) => void;

// let state = initialState;
// let previousState = initialState;
// let nextChanges = {};
// let subscriptions: Subscription[] = [];

// export const getState = () => state;

// export const setState = (changes: Partial<State>) => {
//   nextChanges = Object.assign(nextChanges, changes);
// };

// export const subscriptionLoop = () => {
//   previousState = state;
//   state = Object.assign(state, nextChanges);
//   nextChanges = {};
//   subscriptions.forEach(subscriptions => {
//     subscriptions(state, previousState, getHelpers(state, previousState));
//   });
// };

// export const subscribe = (subscription: Subscription) => {
//   subscriptions.push(subscription);
// };

// export const unsubscribe = (subscription: Subscription) => {
//   subscriptions = subscriptions.filter(s => s !== subscription);
// };
