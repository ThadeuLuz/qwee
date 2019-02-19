export interface IState {
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

const initialState: IState = {
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

type Subscription = (state: IState, oldState: IState) => void;

let state = initialState;
let oldState = initialState;
let subscriptions: Subscription[] = [];

export const getState = () => state;

export const setState = (changes: Partial<IState>) => {
  oldState = state;
  state = Object.assign({}, state, changes);
  subscriptions.forEach(subscription => {
    subscription(state, oldState);
  });
};

export const subscribe = (subscription: Subscription) => {
  subscriptions.push(subscription);
};

export const unsubscribe = (subscription: Subscription) => {
  subscriptions = subscriptions.filter(s => s !== subscription);
};

export const hasChanged = (prop: keyof IState) =>
  state[prop] !== oldState[prop];

export const changedTo = (prop: keyof IState, value: any) =>
  hasChanged(prop) && state[prop] === value;
