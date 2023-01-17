export { determineOutDir }
export { getOutDirAbsolute }

import type { UserConfig, ResolvedConfig } from 'vite'
import { viteIsSSR } from './viteIsSSR'
import { assert } from './assert'
import { assertPosixPath, toPosixPath } from './filesystemPathHandling'
import path from 'path'

/** Appends `client/` or `server/` to `config.build.outDir` */
function determineOutDir(config: ResolvedConfig): string | null {
  // The mechansism to detect a framework down below doesn't work for Astro
  //  - https://github.com/withastro/astro/issues/5211#issuecomment-1326084151
  if (config.plugins.some((p) => p.name?.startsWith('astro:'))) return null

  const outDirRoot = toPosixPath(config.build.outDir)
  assertPosixPath(outDirRoot)

  // Mechanism to detect whether Telefunc is used with framework.
  // When used with a framework then Telefunc should let the framework determine `outDir`.
  // E.g. vite-plugin-ssr and SvelteKit already set `config.build.outDir`.
  if (!isOutDirRoot(outDirRoot)) {
    assertConfig(config)
    return null
  }

  const { outDirClient, outDirServer } = declineOutDirs(outDirRoot)
  if (viteIsSSR(config)) {
    return outDirServer
  } else {
    return outDirClient
  }
}

function declineOutDirs(outDirRoot: string) {
  assertIsOutDirRoot(outDirRoot)
  assertPosixPath(outDirRoot)
  const outDirClient = path.posix.join(outDirRoot, 'client')
  const outDirServer = path.posix.join(outDirRoot, 'server')
  assertIsNotOutDirRoot(outDirClient)
  assertIsNotOutDirRoot(outDirServer)
  return { outDirClient, outDirServer }
}

function assertIsOutDirRoot(outDir: string) {
  assert(isOutDirRoot(outDir))
}
function isOutDirRoot(outDir: string) {
  const p = outDir.split('/').filter(Boolean)
  const lastDir = p[p.length - 1]
  return lastDir !== 'client' && lastDir !== 'server'
}
function assertIsNotOutDirRoot(outDir: string) {
  assert(outDir.endsWith('/client') || outDir.endsWith('/server'))
}

function assertConfig(config: UserConfig | ResolvedConfig) {
  const outDir = config.build?.outDir
  assert(outDir)
  assertIsNotOutDirRoot(outDir)
  if (viteIsSSR(config)) {
    assert(outDir.endsWith('/server'))
  } else {
    assert(outDir.endsWith('/client'))
  }
}

function getOutDirAbsolute(config: ResolvedConfig): string {
  let { outDir } = config.build
  assertPosixPath(outDir)
  if (!outDirIsAbsolutePath(outDir)) {
    const { root } = config
    assertPosixPath(root)
    outDir = path.posix.join(root, outDir)
  }
  return outDir
}

function outDirIsAbsolutePath(outDir: string) {
  // There doesn't seem to be a better alternative to determine whether `outDir` is an aboslute path
  //  - Very unlikely that `outDir`'s first dir macthes the filesystem's first dir
  return getFirstDir(outDir) === getFirstDir(process.cwd())
}
function getFirstDir(p: string) {
  const firstDir = p.split(/\/|\\/).filter(Boolean)[0]
  return firstDir
}
