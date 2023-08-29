const fs = require('fs');

fs.writeFileSync('dist/cjs/package.json', JSON.stringify({ type: 'commonjs' }), function writeJSON(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('writing to ' + 'dist/cjs/package.json:');
});

fs.writeFileSync('dist/esm/package.json', JSON.stringify({ type: 'module' }), function writeJSON(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('writing to ' + 'dist/esm/package.json: ');
});
