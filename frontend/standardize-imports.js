const fs = require('fs');
const path = require('path');

const components = [
  { p: 'Avatar', l: 'avatar' },
  { p: 'Badge', l: 'badge' },
  { p: 'Button', l: 'button' },
  { p: 'DateRangePicker', l: 'date-range-picker' },
  { p: 'Dialog', l: 'dialog' },
  { p: 'DropdownMenu', l: 'dropdown-menu' },
  { p: 'EmptyState', l: 'empty-state' },
  { p: 'Input', l: 'input' },
  { p: 'Label', l: 'label' },
  { p: 'Modal', l: 'modal' },
  { p: 'Pagination', l: 'pagination' },
  { p: 'RadioGroup', l: 'radio-group' },
  { p: 'Select', l: 'select' },
  { p: 'Skeleton', l: 'skeleton' },
  { p: 'Switch', l: 'switch' },
  { p: 'Table', l: 'table' },
  { p: 'Textarea', l: 'textarea' }
];

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') processDir(fullPath);
      return;
    }
    
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;

    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;

    components.forEach(({ p, l }) => {
      // Replace imports from both sources
      const regex = new RegExp(`(from\\s+['"].*?\\/ui\\/)(${p}|${l})(['"])`, 'gi');
      content = content.replace(regex, `$1${l}$3`);
      
      // Also handle relative imports within the ui directory (./Label etc)
      if (fullPath.includes(path.join('components', 'ui'))) {
        const relRegex = new RegExp(`(from\\s+['"]\\.\\/)(${p}|${l})(['"])`, 'gi');
        content = content.replace(relRegex, `$1${l}$3`);
      }
    });

    // Fix formatCurrency utility imports
    content = content.replace(/(from\s+['"].*?\/utils\/)(format|formatCurrency|formatcurrency)(['"])/gi, `$1formatCurrency$3`);

    if (content !== original) {
      fs.writeFileSync(fullPath, content);
      console.log(`Updated imports in: ${fullPath}`);
    }
  });
}

processDir('./src');
console.log('Standardization complete.');
