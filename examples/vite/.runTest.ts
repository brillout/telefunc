import * as util from "util";
import { exec as execAsync } from "child_process";
import { page, run, urlBase, autoRetry } from "../../libframe/test/setup";
import { sleep } from "../../libframe/test/utils";
const exec = util.promisify(execAsync)

export { runTest };

function runTest(cmd: "npm run dev" | "npm run prod") {
  run(cmd);

  test("remote shell with telefunc", async () => {
    page.goto(`${urlBase}/`);
    expect(await page.textContent("body")).not.toContain("node_modules");
    await page.click("button#cmd-dir");
    let n = 0;
    let start = new Date().getTime();
    console.log(31)
    try {
      const r = await exec('dir');
      console.log('r1',r);
    } catch(err) {
      console.log('r2',err);
    }
    console.log(32)
    /*
    await autoRetry(async () => {
      console.log(++n, (new Date().getTime() - start) / 1000);
      expect(await page.textContent("body")).toContain("node_modules");
    });
    */
  });
}

/*
const util = require("util");
const exec = util.promisify(require("child_process").exec);
*/

function runCmd(command) {
  return exec(command);
}
