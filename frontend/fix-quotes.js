const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // If the file starts with double quote and ends with double quote
      let changed = false;
      content = content.trim();
      
      if (content.startsWith('"') && content.endsWith('"')) {
        content = content.substring(1, content.length - 1);
        
        // After removing outer quotes, unescape inner quotes
        if (content.includes('\\"')) {
          content = content.replace(/\\"/g, '"');
        }
        
        // Also replace literal \n with newlines if present
        // Actually, sometimes standard newlines exist. If there are literal \n, unescape them.
        if (content.includes('\\n')) {
            content = content.replace(/\\n/g, '\n');
        }
        
        changed = true;
      } else if (content.includes('\\"')) {
         // Some files might just have escaped quotes inside them without the outer quotes
         content = content.replace(/\\"/g, '"');
         changed = true;
      }

      if (changed && content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed ' + fullPath);
      }
    }
  }
}
processDir('c:/Users/91974/OneDrive/Desktop/Assignment/frontend/src');
