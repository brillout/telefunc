// Trick to skips static analysis of `require()` calls.
// In order to avoid Webpack from doing dynamic dependency analysis.
// And to avoid Next.js to show warnings.
export const nodeRequire = eval('req'+'uire') as NodeRequire
