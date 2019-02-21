export interface State {
  joystick_x: boolean;
  joystick_square: boolean;
  joystick_triangle: boolean;
  joystick_circle: boolean;
  joystick_l1: boolean;
  joystick_l2: number;
  joystick_lStickX: number;
  joystick_l3: boolean;
  joystick_lStickY: number;
  joystick_r1: boolean;
  joystick_r2: number;
  joystick_rStickY: number;
  joystick_rStickX: number;
  joystick_r3: boolean;
  joystick_hat: boolean;
  joystick_up: boolean;
  joystick_left: boolean;
  joystick_down: boolean;
  joystick_right: boolean;
  joystick_select: boolean;
  joystick_start: boolean;
  joystick_ps: boolean;
  message: string;
}

export const initialState: State = {
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
  joystick_ps: false,
  message: "Inicializing..."
};

interface Helpers {
  hasChanged: (props: keyof State) => boolean;
  changedTo: (props: keyof State, value: any) => boolean;
}

type Subscription = (
  state: State,
  previousState: State,
  helpers: Helpers
) => void;

let state = initialState;
let previousState = initialState;
let nextChanges = {};
let subscriptions: Subscription[] = [];

export const getState = () => state;

export const setState = (changes: Partial<State>) => {
  nextChanges = Object.assign(nextChanges, changes);
};

export const subscriptionLoop = () => {
  previousState = state;
  state = Object.assign(state, nextChanges);
  nextChanges = {};
  subscriptions.forEach(subscriptions => {
    subscriptions(state, previousState, getHelpers(state, previousState));
  });
};

export const subscribe = (subscription: Subscription) => {
  subscriptions.push(subscription);
};

export const unsubscribe = (subscription: Subscription) => {
  subscriptions = subscriptions.filter(s => s !== subscription);
};

export const getHelpers = (state: State, previousState: State): Helpers => {
  const hasChanged = (prop: keyof State) => state[prop] !== previousState[prop];

  const changedTo = (prop: keyof State, value: any) =>
    hasChanged(prop) && state[prop] === value;

  return { hasChanged, changedTo };
};
