import util from "util";
import { exec as execAsync } from "child_process";

const exec = util.promisify(execAsync)
/*
const util = require("util");
const exec = util.promisify(require("child_process").exec);
*/

export { runCmd };

function runCmd(command) {
  return exec(command);
}
