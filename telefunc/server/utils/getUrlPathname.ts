export { getUrlPathname }

function getUrlPathname(url: string): string {
  return new URL(url, 'http://fake-domain.com').pathname
}
