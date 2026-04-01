const fs = require('fs');
const path = require('path');

const replacements = {
    "'../../components/ui/Button'": "'../../components/ui/button'",
    "'../ui/Button'": "'../ui/button'",
    "'../../components/ui/Button'": "'../../components/ui/button'",
    "'../../components/ui/input'": "'../../components/ui/Input'",
    "'../ui/input'": "'../ui/Input'",
    "'../../components/ui/skeleton'": "'../../components/ui/Skeleton'",
    "'../ui/skeleton'": "'../ui/Skeleton'",
    "'../../components/ui/table'": "'../../components/ui/Table'",
    "'../ui/table'": "'../ui/Table'",
    "'../../components/ui/label'": "'../../components/ui/label'",
    "'../ui/label'": "'../ui/label'",
    "'../../components/ui/Label'": "'../../components/ui/label'",
    "'../../components/ui/Badge'": "'../../components/ui/Badge'",
    "'../../components/ui/badge'": "'../../components/ui/Badge'",
    "'../../utils/formatCurrency'": "'../../utils/format'"
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const [search, replace] of Object.entries(replacements)) {
         if (content.includes(search)) {
            content = content.split(search).join(replace);
            changed = true;
         }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed imports in ' + fullPath);
      }
    }
  }
}
processDir('c:/Users/91974/OneDrive/Desktop/Assignment/frontend/src');
