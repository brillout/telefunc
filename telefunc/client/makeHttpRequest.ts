import { assert } from "./assert";
import { parse } from "@brillout/json-s";
// @ts-ignore
import fetch = require("@brillout/fetch");
import { TelefunctionName, TelefunctionResult } from "../shared/types";
import { HttpRequestBody, HttpRequestUrl } from "./TelefuncClient";
import { isObject } from "./utils";

export { makeHttpRequest };
export { TelefuncError };

async function makeHttpRequest(
  url: HttpRequestUrl,
  body: HttpRequestBody | undefined,
  telefunctionName: TelefunctionName
): Promise<TelefunctionResult> {
  const makeRequest = addHandli(() =>
    fetch(url, {
      method: "POST",
      body,
      credentials: "same-origin",
      headers: {
        "Content-Type": "text/plain",
      },
    })
  );

  let response;
  let isConnectionError: boolean = false;
  try {
    response = await makeRequest();
  } catch (_) {
    isConnectionError = true;
  }

  if (isConnectionError) {
    throw new TelefuncError("No Server Connection", {
      isConnectionError: true,
      isCodeError: false,
    });
  }

  const statusCode = response.status;
  assert(statusCode === 500 || statusCode === 200);
  const isOk = response.ok;
  assert([true, false].includes(isOk));
  assert(isOk === (statusCode === 200));

  if (statusCode === 200) {
    const responseBody = await response.text();
    const value = parse(responseBody);
    assert(value);
    assert(isObject(value));
    assert("telefuncResult" in value);
    const telefuncResult: unknown = value.telefuncResult;
    return telefuncResult;
  } else {
    const codeErrorText = `The telefunc \`${telefunctionName}\` threw an error. Check the server logs for more information.`;
    throw new TelefuncError(codeErrorText, {
      isConnectionError: false,
      isCodeError: true,
    });
  }
}

class TelefuncError extends Error {
  isCodeError: boolean;
  isConnectionError: boolean;
  constructor(
    message: string,
    {
      isCodeError,
      isConnectionError,
    }: { isCodeError: boolean; isConnectionError: boolean }
  ) {
    super(message);

    // Bugfix: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, TelefuncError.prototype);

    this.isConnectionError = isConnectionError;
    this.isCodeError = isCodeError;

    assert(this.message === message);
    assert(this.isConnectionError !== this.isCodeError);
  }
}

function addHandli(fetcher: () => Promise<TelefunctionResult>) {
  return () => {
    if (
      typeof window !== "undefined" &&
      window.handli &&
      window.handli.constructor === Function
    ) {
      return window.handli(fetcher);
    }
    return fetcher();
  };
}

declare global {
  interface Window {
    handli?: any;
  }
}
