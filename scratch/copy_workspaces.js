const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'df-admin', 'src', 'components', 'workspaces');
const destDir = path.join(__dirname, '..', 'src', 'admin', 'components', 'workspaces');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  fs.copyFileSync(srcFile, destFile);
  console.log(`Copied ${file} to src/admin/components/workspaces/`);
});
