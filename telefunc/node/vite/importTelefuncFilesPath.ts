export { importTelefuncFilesFilePath }
export { importTelefuncFilesFileNameBase }

const importTelefuncFilesFileNameBase = 'importTelefuncFiles'

//import '../../dist/node/vite/importTelefuncFiles.js'
//import '../../dist/node/vite/importTelefuncFilesPath.js'
const telefuncRoot = [
  //            node_modules/telefunc/dist/node/vite/importTelefuncFilesPath.js
  __dirname, // node_modules/telefunc/dist/node/vite/
  '..', //      node_modules/telefunc/dist/node/
  '..', //      node_modules/telefunc/dist/
  '..', //      node_modules/telefunc/
].join('/')

// Not the built `dist/*.js` JavaScript, but the actual `*.ts` TypeScript source
const importTelefuncFilesFilePath = `${telefuncRoot}/node/vite/${importTelefuncFilesFileNameBase}.ts`
