import { telefuncClient } from "./global-instance";
import { TelefuncError } from "./makeHttpRequest";

export { TelefuncError };
export const { config } = telefuncClient;

const server = telefuncClient.telefunctions
export { server };

if (typeof window !== "undefined") {
  window.telefunc = {
    server,
    config,
    TelefuncError,
  } as never;
}

// TypeScript users should never use `window.telefunc`
declare global {
  interface Window {
    telefunc: never;
  }
}
