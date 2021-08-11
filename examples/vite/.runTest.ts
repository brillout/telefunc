import { page, run, urlBase, autoRetry } from "../../libframe/test/setup";

export { runTest };

function runTest(cmd: "npm run dev" | "npm run prod") {
  run(cmd);

  test("remote shell with telefunc", async () => {
    page.goto(`${urlBase}/`);
    expect(await page.textContent("body")).not.toContain("node_modules");
    if( isWindows() ) {
      // Running Node.js' exec in windows hangs the GitHub action
      return;
    }
    await page.click("button#cmd-ls");
    await autoRetry(async () => {
      expect(await page.textContent("body")).toContain("node_modules");
    });
  });
}

function isWindows() {
   return process.platform === 'win32'
}
