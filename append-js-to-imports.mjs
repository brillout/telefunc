import fs from 'fs';
import path from 'path';

const DIRECTORY = './telefunc'; // Updated directory
const IMPORT_REGEX = /(import .*? from ['"])(\.\.?\/[^'";]+)(['"])/g;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(IMPORT_REGEX, (match, start, modulePath, end) => {
    // Append .js if there is no extension on the module path
    return path.extname(modulePath) ? match : `${start}${modulePath}.js${end}`;
  });

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function traverseDirectory(dir) {
  if (dir.includes('node_modules')) return; // Skip node_modules
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  });
}

traverseDirectory(DIRECTORY);
