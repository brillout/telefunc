import { join } from "path";
import { statSync } from "fs";

export { isWebpack };

function isWebpack() {
  // TODO: make this test more robust
  const webpackConfigFile = "webpack.js";
  return pathExits(join(process.cwd(), webpackConfigFile));
}

function pathExits(path: string) {
  try {
    // `throwIfNoEntry: false` isn't supported in older Node.js versions
    return !!statSync(path /*{ throwIfNoEntry: false }*/);
  } catch (err) {
    return false;
  }
}
