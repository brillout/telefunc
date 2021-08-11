import { createError } from "@brillout/libassert";

export { assert };
export { assertUsage };

const libName = "Telefunc";

function assert(condition: unknown): asserts condition {
  if (condition) {
    return;
  }

  const projectGithub = "telefunc/telefunc";
  const prefix = `[${libName}][Internal Error] Something unexpected happened. Please open a new issue at https://github.com/${projectGithub}/issues/new and include this error stack.`;

  const internalError = createError({ prefix });
  throw internalError;
}

function assertUsage(
  condition: unknown,
  errorMessage: string
): asserts condition {
  if (condition) {
    return;
  }

  const usageError = createError({
    prefix: `[${libName}][Wrong Usage]`,
    errorMessage,
  });
  throw usageError;
}
