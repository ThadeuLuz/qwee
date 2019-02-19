import chalk from "chalk";

export const log = (...p: any[]) => console.log(chalk.blue(...p));
export const info = (...p: any[]) => console.info(chalk.green(...p));
export const warn = (...p: any[]) => console.warn(chalk.yellow(...p));
export const error = (...p: any[]) => console.error(chalk.red(...p));

export const scale = (
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
) => {
  const clampV = Math.min(Math.max(fromLow, value), fromHigh);
  if (clampV !== value) {
    warn(`Value ${value} clamped in range ${fromLow}-${fromHigh}`);
  }
  return ((clampV - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
};
