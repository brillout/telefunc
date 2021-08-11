import { page, run, urlBase } from "../../libframe/test/setup";

run("npm run start");

test("page content is rendered to DOM", async () => {
  page.goto(`${urlBase}/`);
  await page.click("button");
  expect(await page.textContent("body")).toContain("42");
});
