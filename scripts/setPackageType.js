import packageFile from '../package.json' assert { type: 'json' };
import fs from 'fs';

packageFile.type = 'commonjs';
fs.writeFile('dist/cjs/package.json', JSON.stringify(packageFile), function writeJSON(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('writing to ' + 'dist/cjs/package.json:');
  console.log(JSON.stringify(packageFile));
});

packageFile.type = 'module';
fs.writeFile('dist/esm/package.json', JSON.stringify(packageFile), function writeJSON(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('writing to ' + 'dist/esm/package.json: ');
  console.log(JSON.stringify(packageFile));
});
