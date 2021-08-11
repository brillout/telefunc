import { page, run, urlBase, autoRetry } from "../../libframe/test/setup";
import { sleep } from "../../libframe/test/utils";

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
    await sleep(5000);
    console.log(32)
    /*
    await autoRetry(async () => {
      console.log(++n, (new Date().getTime() - start) / 1000);
      expect(await page.textContent("body")).toContain("node_modules");
    });
    */
  });
}
