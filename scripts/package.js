#!/usr/bin/env node

/**
 * Package script for GIS Service Log Chrome Extension
 * Creates a production-ready ZIP file for distribution
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read version from manifest.json
const manifestPath = path.join(__dirname, '..', 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const version = manifest.version;

// Files to include in the package
const files = [
  'manifest.json',
  'background.js',
  'popup.html',
  'popup.js',
  'options.html',
  'options.js',
  'urllog.js',
  'icon-default-16.png',
  'icon-default-32.png',
  'icon-default-48.png',
  'icon-default-128.png',
  'icon-active-16.png',
  'icon-active-32.png',
  'icon-active-48.png',
  'icon-active-128.png',
  'license.txt',
  'README.md'
];

// Output filename
const outputFile = `gis-service-log-v${version}.zip`;
const outputPath = path.join(__dirname, '..', outputFile);

console.log('📦 Packaging GIS Service Log Extension...');
console.log(`   Version: ${version}`);
console.log(`   Output: ${outputFile}\n`);

// Check if all files exist
console.log('✓ Checking files...');
const missingFiles = [];
files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error('❌ Missing files:');
  missingFiles.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
}

console.log(`   Found ${files.length} files\n`);

// Remove old package if it exists
if (fs.existsSync(outputPath)) {
  console.log('🗑️  Removing old package...');
  fs.unlinkSync(outputPath);
}

// Create ZIP file
console.log('📦 Creating ZIP archive...');
try {
  // Use native zip command (cross-platform)
  const fileList = files.join(' ');
  
  // Check if zip command is available
  try {
    execSync('zip --version', { stdio: 'ignore' });
  } catch (e) {
    console.error('❌ Error: "zip" command not found.');
    console.error('   Please install zip:');
    console.error('   - macOS: Already installed');
    console.error('   - Linux: sudo apt-get install zip');
    console.error('   - Windows: Install via Git Bash or WSL');
    process.exit(1);
  }
  
  execSync(`zip -q ${outputFile} ${fileList}`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  
  // Get file size
  const stats = fs.statSync(outputPath);
  const fileSizeKB = (stats.size / 1024).toFixed(2);
  
  console.log('\n✅ Package created successfully!');
  console.log(`   File: ${outputFile}`);
  console.log(`   Size: ${fileSizeKB} KB`);
  console.log('\n📤 Ready for Chrome Web Store submission!');
  
} catch (error) {
  console.error('❌ Error creating package:', error.message);
  process.exit(1);
}
