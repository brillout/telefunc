export { findTsConfig }

import { ts } from 'ts-morph'
import { assert } from '../../../../utils/assert.js'
import { assertPosixPath } from '../../../../utils/path.js'
import fs from 'node:fs'
import path from 'node:path'

// Matches the TypeScript language server algorithm: walk up to find the nearest tsconfig,
// then check project references to find a more specific tsconfig that claims the file.
function findTsConfig(telefuncFilePath: string, appRootDir: string): string | null {
  assert(fs.existsSync(telefuncFilePath))
  assertPosixPath(telefuncFilePath)
  assertPosixPath(appRootDir)
  assert(telefuncFilePath.startsWith(appRootDir))

  const nearestTsConfig = findNearestTsConfig(telefuncFilePath, appRootDir)
  if (!nearestTsConfig) return null

  const realFilePath = cachedRealpathSync(telefuncFilePath)
  const referencedTsConfig = findOwningReference(nearestTsConfig, realFilePath)
  return referencedTsConfig ?? nearestTsConfig
}

function findNearestTsConfig(filePath: string, appRootDir: string): string | null {
  let curr = filePath
  do {
    const dir = path.dirname(curr)
    if (dir === curr) return null
    if (!dir.startsWith(appRootDir)) return null
    const tsConfigFilePath = path.join(dir, 'tsconfig.json')
    if (fs.existsSync(tsConfigFilePath)) return tsConfigFilePath
    curr = dir
  } while (true)
}

function findOwningReference(
  tsConfigPath: string,
  realFilePath: string,
  visited: Set<string> = new Set(),
): string | null {
  const realTsConfigPath = cachedRealpathSync(tsConfigPath)
  if (visited.has(realTsConfigPath)) return null
  visited.add(realTsConfigPath)

  const config = readTsConfig(realTsConfigPath)
  if (!config) return null
  const references = config.references
  if (!Array.isArray(references) || references.length === 0) return null

  for (const ref of references) {
    const refTsConfigPath = resolveReferencePath(tsConfigPath, ref.path)

    if (tsConfigIncludesFile(refTsConfigPath, realFilePath)) {
      return refTsConfigPath
    }

    const nested = findOwningReference(refTsConfigPath, realFilePath, visited)
    if (nested) return nested
  }

  return null
}

const realpathCache: Record<string, string> = {}

function cachedRealpathSync(filePath: string): string {
  realpathCache[filePath] ??= fs.realpathSync(filePath)
  return realpathCache[filePath]!
}

const tsConfigReadCache: Record<string, { config: any } | null> = {}

function readTsConfig(realTsConfigPath: string): any | null {
  if (!(realTsConfigPath in tsConfigReadCache)) {
    const configFile = ts.readConfigFile(realTsConfigPath, ts.sys.readFile)
    tsConfigReadCache[realTsConfigPath] = configFile.error ? null : { config: configFile.config }
  }
  return tsConfigReadCache[realTsConfigPath]?.config ?? null
}

function resolveReferencePath(fromTsConfig: string, refPath: string): string {
  const resolved = path.resolve(path.dirname(fromTsConfig), refPath)
  try {
    if (fs.statSync(resolved).isDirectory()) {
      return path.join(resolved, 'tsconfig.json')
    }
  } catch (err: any) {
    if (err?.code !== 'ENOENT' && err?.code !== 'ENOTDIR') throw err
  }
  return resolved
}

const parsedTsConfigFileCache: Record<string, Set<string>> = {}

function tsConfigIncludesFile(tsConfigPath: string, realFilePath: string): boolean {
  const realTsConfigPath = cachedRealpathSync(tsConfigPath)
  const config = readTsConfig(realTsConfigPath)
  if (!config) return false

  if (!parsedTsConfigFileCache[realTsConfigPath]) {
    const configDir = path.dirname(realTsConfigPath)
    const parsed = ts.parseJsonConfigFileContent(config, ts.sys, configDir)
    parsedTsConfigFileCache[realTsConfigPath] = new Set(
      parsed.fileNames.map((f) => cachedRealpathSync(path.resolve(f))),
    )
  }

  return parsedTsConfigFileCache[realTsConfigPath]!.has(realFilePath)
}
