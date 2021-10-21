export { isSSR };

function isSSR(): boolean {
  return process.argv.includes("--ssr");
}
