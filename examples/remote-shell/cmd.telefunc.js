import { getContext } from 'telefunc'
import util from 'util'
import { exec as execWithCallback } from 'child_process'
const exec = util.promisify(execWithCallback)

export { runShellCommand }

async function runShellCommand(cmd) {
  const context = getContext()
  const { userAgent } = context
  try {
    const cmdResult = await exec(cmd)
    const { stdout } = cmdResult
    return stdout
  } catch (cmdResult) {
    const { stderr } = cmdResult
    return JSON.stringify(
      {
        cmd,
        stderr,
        userAgent,
      },
      null,
      2,
    )
  }
}
