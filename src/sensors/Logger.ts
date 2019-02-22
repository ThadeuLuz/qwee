export type LogType = "error" | "warn" | "info" | "log";

interface Log {
  type: LogType;
  payload: string[];
}

export type LoggerState = Log[];

export const loggerInitialState: LoggerState = Array(10)
  .fill("")
  .map((): Log => ({ type: "log", payload: [] }));

const loggerState = loggerInitialState;

export const getLoggerState = () => loggerState;

export const getLogger = (type: LogType) => (...payload: string[]) => {
  loggerState.shift();
  loggerState.push({ type, payload });
};

export const log = getLogger("log");
export const info = getLogger("info");
export const warn = getLogger("warn");
export const error = getLogger("error");

// export const printStateAndMessages = () => {
//   console.clear();
//   console.log(state);
//   loggerState.forEach(({ type, payload }) => logFunctions[type](payload));
// };
