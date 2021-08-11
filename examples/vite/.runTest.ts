import { page, run, urlBase, autoRetry } from "../../libframe/test/setup";

export { runTest };

function runTest(cmd: "npm run dev" | "npm run prod") {
  run(cmd);

  test("remote shell with telefunc", async () => {
    expect(1).toBe(1);
    console.log(1)
    page.goto(`${urlBase}/`);
    console.log(2)
    expect(await page.textContent("body")).not.toContain("node_modules");
    console.log(3)
    await page.click("button");
    console.log(4)
    /*
    await autoRetry(async () => {
      expect(await page.textContent("body")).toContain("node_modules");
    });
    */
  });
}
