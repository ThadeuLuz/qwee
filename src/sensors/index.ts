import chalk from "chalk";

import IMU, { getImuState, IIMUState } from "./IMU";
import Joystick, { getJoystickState, IJoystickState } from "./Joystick";
import { getLoggerState, LoggerState, LogType } from "./Logger";

// Initialize sensors
Joystick();
IMU();

export interface State {
  joystick: IJoystickState;
  logs: LoggerState;
  imu: IIMUState;
}

export const getState = (): State => {
  return {
    joystick: getJoystickState(),
    logs: getLoggerState(),
    imu: getImuState()
  };
};

type StateSubprop = keyof IJoystickState | keyof IIMUState;
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

const logFunctions: Record<LogType, (p: string[]) => void> = {
  log: (p: string[]) => console.log(...p.map(s => chalk.blue(s))),
  info: (p: string[]) => console.info(...p.map(s => chalk.green(s))),
  warn: (p: string[]) => console.warn(...p.map(s => chalk.yellow(s))),
  error: (p: string[]) => console.error(...p.map(s => chalk.red(s)))
};

export const printLogs = () => {
  const { logs, ...others } = getState();
  console.clear();
  console.log(others);
  logs.forEach(({ type, payload }) => {
    logFunctions[type](payload);
  });
};
