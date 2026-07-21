const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'api', 'db.ts');
if (fs.existsSync(target)) {
  fs.unlinkSync(target);
  console.log('Deleted api/db.ts successfully!');
} else {
  console.log('api/db.ts not found.');
}
