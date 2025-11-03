#!/usr/bin/env node

/**
 * Clean script for GIS Service Log Chrome Extension
 * Removes generated files and build artifacts
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning build artifacts...\n');

// Patterns to clean
const patterns = [
  'gis-service-log-v*.zip',
  'node_modules'
];

let removedCount = 0;

patterns.forEach(pattern => {
  const dir = path.join(__dirname, '..');
  
  if (pattern === 'node_modules') {
    const nodeModulesPath = path.join(dir, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
      console.log(`   Removing: node_modules/`);
      fs.rmSync(nodeModulesPath, { recursive: true, force: true });
      removedCount++;
    }
  } else {
    // Handle glob patterns (simple implementation for .zip files)
    const files = fs.readdirSync(dir);
    const regex = new RegExp(pattern.replace('*', '.*'));
    
    files.forEach(file => {
      if (regex.test(file)) {
        const filePath = path.join(dir, file);
        console.log(`   Removing: ${file}`);
        fs.unlinkSync(filePath);
        removedCount++;
      }
    });
  }
});

if (removedCount === 0) {
  console.log('   Nothing to clean');
} else {
  console.log(`\n✅ Cleaned ${removedCount} item(s)`);
}
