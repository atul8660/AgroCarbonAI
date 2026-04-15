const fs = require('fs');
const path = require('path');

// Create backend directories
const backendDirs = [
  'controllers',
  'middleware',
  'config'
];

backendDirs.forEach(dir => {
  const dirPath = path.join(__dirname, 'backend', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created: ${dirPath}`);
  }
});

// Create frontend directories
const frontendDirs = [
  'css',
  'js',
  'assets',
  'pages'
];

frontendDirs.forEach(dir => {
  const dirPath = path.join(__dirname, 'frontend', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created: ${dirPath}`);
  }
});

console.log('\n✓ Folder structure setup complete!');
