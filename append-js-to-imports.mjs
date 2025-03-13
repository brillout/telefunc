import fs from 'node:fs'
import path from 'node:path'

const DIRECTORY = './telefunc' // Updated directory

// Regex for static imports and re-exports with "from"
const IMPORT_EXPORT_REGEX = /((?:import|export)(?:[\s\w{},*]+)?\s+from\s+['"])(\.\.?\/[^'";]+)(['"])/g
// Regex for side-effect imports (e.g., import './module')
const SIDE_EFFECT_IMPORT_REGEX = /(import\s+['"])(\.\.?\/[^'";]+)(['"])/g
// Regex for dynamic imports (e.g., import('./module'))
const DYNAMIC_IMPORT_REGEX = /(import\(\s*['"])(\.\.?\/[^'";]+)(['"]\s*\))/g

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  let updatedContent = content

  // Handle static imports and re-exports
  updatedContent = updatedContent.replace(IMPORT_EXPORT_REGEX, (match, prefix, modulePath, suffix) => {
    return path.extname(modulePath) ? match : `${prefix}${modulePath}.js${suffix}`
  })

  // Handle side-effect imports
  updatedContent = updatedContent.replace(SIDE_EFFECT_IMPORT_REGEX, (match, prefix, modulePath, suffix) => {
    return path.extname(modulePath) ? match : `${prefix}${modulePath}.js${suffix}`
  })

  // Handle dynamic imports
  updatedContent = updatedContent.replace(DYNAMIC_IMPORT_REGEX, (match, prefix, modulePath, suffix) => {
    return path.extname(modulePath) ? match : `${prefix}${modulePath}.js${suffix}`
  })

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8')
    console.log(`Updated: ${filePath}`)
  }
}

function traverseDirectory(dir) {
  if (dir.includes('node_modules')) return // Skip node_modules
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath)
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
      processFile(fullPath)
    }
  })
}

traverseDirectory(DIRECTORY)
