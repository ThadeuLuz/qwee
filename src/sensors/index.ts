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

type Subprop = keyof JoystickState;
type Prop = [keyof State, Subprop];

export interface Helpers {
  hasChanged: (props: Prop) => boolean;
  changedTo: (props: Prop, value: any) => boolean;
}

export const getHelpers = (state: State, previousState: State): Helpers => {
  const hasChanged = ([prop, subprop]: Prop) =>
    state[prop][subprop] !== previousState[prop][subprop];

  const changedTo = ([prop, subprop]: Prop, value: any) =>
    hasChanged([prop, subprop]) && state[prop][subprop] === value;

  return { hasChanged, changedTo };
};
