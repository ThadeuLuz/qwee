const chalk = require("chalk");

exports.log = (...p) => console.log(chalk.blue(...p));
exports.info = (...p) => console.info(chalk.green(...p));
exports.warn = (...p) => console.warn(chalk.yellow(...p));
exports.error = (...p) => console.error(chalk.red(...p));
