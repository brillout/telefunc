import { getContext } from "telefunc";
import { runCmd } from "./runCmd";

export { runShellCommand };

async function runShellCommand(cmd) {
  const context = getContext();
  const { userAgent } = context;
  try {
    const cmdResult = await runCmd(cmd);
    console.log(11, cmdResult)
    const { stdout } = cmdResult;
    return stdout;
  } catch (cmdResult) {
    console.log(22, cmdResult)
    const { stderr } = cmdResult;
    return JSON.stringify(
      {
        cmd,
        stderr,
        userAgent,
      },
      null,
      2
    );
  }
}
