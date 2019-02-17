const chalk = require("chalk");

exports.log = (...p) => console.log(chalk.blue(...p));
exports.info = (...p) => console.info(chalk.green(...p));
exports.warn = (...p) => console.warn(chalk.yellow(...p));
exports.error = (...p) => console.error(chalk.red(...p));

exports.scale = (value, fromLow, fromHigh, toLow, toHigh) => {
  const clampV = Math.min(Math.max(fromLow, value), fromHigh);
  if (clampV !== value) {
    exports.warn(`Value ${value} clamped in range ${fromLow}-${fromHigh}`);
  }
  return ((clampV - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
};
