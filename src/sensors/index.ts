import Joystick, { getJoystickState, JoystickState } from "./Joystick";
import { getLoggerState, LoggerState } from "./Logger";

// Initialize sensors
Joystick();

export interface State {
  joystick: JoystickState;
  logs: LoggerState;
}

export const getState = (): State => {
  return {
    joystick: getJoystickState(),
    logs: getLoggerState()
  };
};

type StateSubprop = keyof JoystickState;
type StateProp = keyof State;

export interface Helpers {
  hasChanged: (props: StateProp, subprop: StateSubprop) => boolean;
  changedTo: (props: StateProp, subprop: StateSubprop, value: any) => boolean;
}

export const getHelpers = (state: State, previousState: State): Helpers => {
  const hasChanged = (prop: StateProp, subprop: StateSubprop) =>
    state[prop][subprop] !== previousState[prop][subprop];

  const changedTo = (prop: StateProp, subprop: StateSubprop, value: any) =>
    hasChanged(prop, subprop) && state[prop][subprop] === value;

  return { hasChanged, changedTo };
};
