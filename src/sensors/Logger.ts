type LogType = "error" | "warn" | "info" | "log";

interface Log {
  type: LogType;
  payload: string[];
}

export type LoggerState = Log[];

const loggerState: LoggerState = Array(10)
  .fill("")
  .map((): Log => ({ type: "log", payload: [] }));

export const getLoggerState = () => loggerState;

export const getLogger = (type: LogType) => (...payload: string[]) => {
  loggerState.shift();
  loggerState.push({ type, payload });
};

export const log = getLogger("log");
export const info = getLogger("info");
export const warn = getLogger("warn");
export const error = getLogger("error");

// const logFunctions: Record<LogType, (p: string[]) => void> = {
//   log: (p: string[]) => console.log("🐟", ...p.map(s => chalk.blue(s))),
//   info: (p: string[]) => console.info("🐸", ...p.map(s => chalk.green(s))),
//   warn: (p: string[]) => console.warn("🐱", ...p.map(s => chalk.yellow(s))),
//   error: (p: string[]) => console.error("🐞", ...p.map(s => chalk.red(s)))
// };

// export const printStateAndMessages = () => {
//   console.clear();
//   console.log(state);
//   loggerState.forEach(({ type, payload }) => logFunctions[type](payload));
// };
