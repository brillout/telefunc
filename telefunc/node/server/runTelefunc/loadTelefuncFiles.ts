export { loadTelefuncFiles }

import type { TelefuncFiles } from '../types.js'
import { assertUsage, assert, hasProp, isWebpack, isVikeApp } from '../../utils.js'
import { loadTelefuncFilesUsingVite } from '../../vite/loadTelefuncFilesUsingVite.js'
import { loadTelefuncFilesUsingRegistration } from './loadTelefuncFilesUsingRegistration.js'
import { loadTelefuncFilesFromConfig } from './loadTelefuncFilesFromConfig.js'
import pc from '@brillout/picocolors'

async function loadTelefuncFiles(runContext: {
  appRootDir: string | null
  telefuncFilesManuallyProvidedByUser: string[] | null
  telefuncFilePath: string
}): Promise<{ telefuncFilesLoaded: TelefuncFiles; telefuncFilesAll: string[] }> {
  // - The user manually provides the list of `.telefunc.js` files with `config.telefuncFiles`
  {
    if (runContext.telefuncFilesManuallyProvidedByUser) {
      assert(hasProp(runContext, 'telefuncFilesManuallyProvidedByUser', 'string[]')) // Help TS narrow `runContext`
      const { telefuncFilesLoaded, telefuncFilesAll } = await loadTelefuncFilesFromConfig(runContext)
      assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr('manually provided by user'))
      return { telefuncFilesLoaded, telefuncFilesAll }
    }
  }

  // Vite:
  // - In development, `.telefunc.js` files provided with Vite's development server
  // - In production, `.telefunc.js` files provided with @brillout/vite-plugin-server-entry
  {
    const res = await loadTelefuncFilesUsingVite(runContext, false)
    if (res) {
      const { telefuncFilesLoaded, viteProvider, telefuncFilesAll } = res
      assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr(viteProvider))
      return { telefuncFilesLoaded, telefuncFilesAll }
    }
  }

  // - Next.js
  // - Nuxt 2
  {
    const telefuncFilesLoaded = loadTelefuncFilesUsingRegistration()
    if (telefuncFilesLoaded) {
      const telefuncFilesAll = Object.keys(telefuncFilesLoaded)
      assertUsage(Object.keys(telefuncFilesAll).length > 0, getNothingFoundErr('automatic registration'))
      return { telefuncFilesLoaded, telefuncFilesAll }
    }
  }

  if (isVikeApp() || !isWebpack()) {
    // Show [manual import error](https://github.com/brillout/vite-plugin-server-entry#manual-import):
    // ```
    // [@brillout/vite-plugin-server-entry][Wrong Usage] The server production entry is missing.
    // (Re-)build your app and try again. If you still get this error, then you need to manually
    // import the server production entry.
    // ```
    //
    const res2 = await loadTelefuncFilesUsingVite(runContext, true)
    assert(res2 === null)
    assert(false) // loadTelefuncFilesUsingVite() should have thrown the assertUsage() error above
  } else {
    // Generic message
    assertUsage(false, `Couldn't find method for retrieving ${pc.cyan('.telefunc.js')} files. Is your stack supported?`)
  }
}

function getNothingFoundErr(retrievalMethod: string) {
  return `No ${pc.code('.telefunc.{js|ts|...}')} file found. Did you create one? (Retrieval method: ${retrievalMethod}.)`
}
