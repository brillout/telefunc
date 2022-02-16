// Skip static analysis of `require()` calls:
//  - Avoid Webpack from doing dynamic dependency analysis.
//  - Avoid Next.js to show warnings.
export const nodeRequire = require
