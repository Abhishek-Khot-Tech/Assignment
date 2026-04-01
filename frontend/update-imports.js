const fs = require('fs');
const path = require('path');

const replacements = {
  '/ui/avatar': '/ui/Avatar',
  '/ui/button': '/ui/Button',
  '/ui/dialog': '/ui/Dialog',
  '/ui/dropdown-menu': '/ui/DropdownMenu',
  '/ui/label': '/ui/Label',
  '/ui/radio-group': '/ui/RadioGroup',
  '/ui/switch': '/ui/Switch',
  '/ui/textarea': '/ui/Textarea',
  '/utils/format\'': '/utils/formatCurrency\'',
  '/utils/format"': '/utils/formatCurrency"',
};

function processDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== 'node_modules') {
      processDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      Object.keys(replacements).forEach(key => {
        if (content.includes(key)) {
          content = content.split(key).join(replacements[key]);
          changed = true;
        }
      });
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated imports in: ${fullPath}`);
      }
    }
  });
}

processDir('./src');
