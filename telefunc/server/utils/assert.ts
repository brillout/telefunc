import { createError } from "@brillout/libassert";

export { assert };
export { assertUsage };
export { assertWarning };
export { getUsageError };
export { UsageError };
export { internalErroPrefix };

const libName = "Telefunc";

export const requestForContact =
  "Please open a new issue at https://github.com/telefunc/telefunc/issues/new and include this error stack.";

function assert(condition: unknown): asserts condition {
  if (condition) {
    return;
  }

  const prefix = internalErroPrefix;

  const internalError = createError({ prefix });

  throw internalError;
}
const internalErroPrefix = `[${libName}][Internal Error] Something unexpected happened. ${requestForContact}`;

type UsageError = Error & { _brand?: "UsageError" };
function assertUsage(
  condition: unknown,
  errorMessage: string
): asserts condition {
  if (condition) {
    return;
  }

  const usageError = getUsageError(errorMessage);
  throw usageError;
}
function getUsageError(errorMessage: string): UsageError {
  const usageError: UsageError = createError({
    prefix: `[${libName}][Wrong Usage]`,
    errorMessage,
  });
  return usageError;
}

function assertWarning(condition: unknown, errorMessage: string): void {
  if (condition) {
    return;
  }

  const warning = createError({
    prefix: `[${libName}][Warning]`,
    errorMessage,
  });

  console.warn(warning);
}
