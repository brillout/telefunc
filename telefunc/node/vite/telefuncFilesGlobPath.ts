export { telefuncFilesGlobFilePath }
export { telefuncFilesGlobFileNameBase }

const telefuncFilesGlobFileNameBase = 'telefuncFilesGlob'

//import '../../dist/node/vite/telefuncFilesGlob.js'
//import '../../dist/node/vite/telefuncFilesGlobPath.js'
const telefuncRoot = [
  //            node_modules/telefunc/dist/node/vite/telefuncFilesGlobPath.js
  __dirname, // node_modules/telefunc/dist/node/vite/
  '..', //      node_modules/telefunc/dist/node/
  '..', //      node_modules/telefunc/dist/
  '..', //      node_modules/telefunc/
].join('/')

// Not the built `dist/*.js` JavaScript, but the actual `*.ts` TypeScript source
//const telefuncFilesGlobFilePath = `${telefuncRoot}/node/vite/${telefuncFilesGlobFileNameBase}.ts`
const telefuncFilesGlobFilePath = `${__dirname}/${telefuncFilesGlobFileNameBase}.js`
