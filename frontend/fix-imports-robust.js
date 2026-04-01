const fs = require('fs');
const path = require('path');

const components = [
  'Avatar', 'Badge', 'Button', 'DateRangePicker', 'Dialog', 'DropdownMenu', 
  'EmptyState', 'Input', 'Label', 'Modal', 'Pagination', 
  'RadioGroup', 'Select', 'Skeleton', 'Switch', 'Table', 'Textarea'
];

const utils = {
  'format': 'formatCurrency',
  'formatcurrency': 'formatCurrency'
};

function processDir(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules') processDir(fullPath);
      return;
    }
    
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;

    let content = fs.readFileSync(fullPath, 'utf8');
    let originalContent = content;

    // Fix UI imports
    // Matches: from './label', from '../ui/button', from '@/components/ui/input', etc.
    components.forEach(comp => {
      const lowerComp = comp.toLowerCase();
      // Regex to find the component name in an import path, ensuring it's the last part or preceded by /
      // e.g., matches ".../button" or "./button" or "@/.../button"
      const regex = new RegExp(`(from\\s+['"])(.*?\\/|\\.\\/)?(${lowerComp})(['"])`, 'g');
      content = content.replace(regex, (match, p1, p2, p3, p4) => {
        // Only replace if it's actually one of our UI components (check p2 for ui or being in ui dir)
        return p1 + (p2 || '') + comp + p4;
      });
    });

    // Fix formatCurrency
    content = content.replace(/(from\s+['"].*?\/utils\/)(format|formatcurrency)(['"])/g, `$1formatCurrency$3`);

    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content);
      console.log(`Fixed imports in: ${fullPath}`);
    }
  });
}

processDir('./src');
console.log('Global import fix completed.');
