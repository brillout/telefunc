import { assertUsage } from "./utils";
export { getContext } from "./getContext";
export { createTelefuncCaller } from "./createTelefuncCaller";

assertNodejs();

function assertNodejs() {
  const isNodejs =
    typeof "process" !== "undefined" &&
    process &&
    process.versions &&
    process.versions.node;
  assertUsage(
    isNodejs,
    [
      "You are loading the module `telefunc` in the browser.",
      "The module `telefunc` is meant for your Node.js server. Load `telefunc/client` instead.",
    ].join(" ")
  );
}
