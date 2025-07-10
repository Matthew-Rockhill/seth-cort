#!/usr/bin/env node

/**
 * Bundle Analysis Script for Seth Cort Music Website
 * This script analyzes the build output and provides performance insights
 */

const fs = require('fs');
const path = require('path');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  const outputDir = path.join(process.cwd(), '.nuxt/dist/client');
  
  if (!fs.existsSync(outputDir)) {
    console.log('❌ Build output not found. Run `npm run build` first.');
    return;
  }

  console.log('🔍 Analyzing bundle...\n');

  const files = fs.readdirSync(outputDir, { recursive: true });
  const assets = {
    js: [],
    css: [],
    other: []
  };

  let totalSize = 0;

  files.forEach(file => {
    if (typeof file !== 'string') return;
    
    const fullPath = path.join(outputDir, file);
    if (!fs.statSync(fullPath).isFile()) return;

    const size = fs.statSync(fullPath).size;
    totalSize += size;
    
    const ext = path.extname(file);
    const asset = { name: file, size, formatted: formatBytes(size) };

    if (ext === '.js') {
      assets.js.push(asset);
    } else if (ext === '.css') {
      assets.css.push(asset);
    } else {
      assets.other.push(asset);
    }
  });

  // Sort by size (largest first)
  assets.js.sort((a, b) => b.size - a.size);
  assets.css.sort((a, b) => b.size - a.size);

  console.log('📊 Bundle Analysis Results');
  console.log('='.repeat(50));
  console.log(`Total Bundle Size: ${formatBytes(totalSize)}`);
  console.log();

  // JavaScript Analysis
  console.log('🟨 JavaScript Files:');
  const totalJS = assets.js.reduce((sum, file) => sum + file.size, 0);
  console.log(`Total JS: ${formatBytes(totalJS)}`);
  
  assets.js.slice(0, 10).forEach(file => {
    const percentage = ((file.size / totalJS) * 100).toFixed(1);
    console.log(`  • ${file.name} - ${file.formatted} (${percentage}%)`);
  });
  
  if (assets.js.length > 10) {
    console.log(`  ... and ${assets.js.length - 10} more files`);
  }
  console.log();

  // CSS Analysis
  console.log('🟦 CSS Files:');
  const totalCSS = assets.css.reduce((sum, file) => sum + file.size, 0);
  console.log(`Total CSS: ${formatBytes(totalCSS)}`);
  
  assets.css.forEach(file => {
    const percentage = ((file.size / totalCSS) * 100).toFixed(1);
    console.log(`  • ${file.name} - ${file.formatted} (${percentage}%)`);
  });
  console.log();

  // Performance Recommendations
  console.log('💡 Performance Recommendations:');
  console.log('='.repeat(50));

  // Check for large JS files
  const largeJSFiles = assets.js.filter(file => file.size > 500 * 1024); // 500KB
  if (largeJSFiles.length > 0) {
    console.log('⚠️  Large JavaScript files detected:');
    largeJSFiles.forEach(file => {
      console.log(`   ${file.name} (${file.formatted}) - Consider code splitting`);
    });
    console.log();
  }

  // Check total bundle size
  if (totalJS > 1024 * 1024) { // 1MB
    console.log('⚠️  Total JS bundle is over 1MB. Consider:');
    console.log('   - Implementing more aggressive code splitting');
    console.log('   - Removing unused dependencies');
    console.log('   - Using dynamic imports for heavy components');
    console.log();
  } else {
    console.log('✅ JavaScript bundle size is within recommended limits');
  }

  if (totalCSS > 100 * 1024) { // 100KB
    console.log('⚠️  CSS bundle is over 100KB. Consider:');
    console.log('   - Removing unused CSS');
    console.log('   - Using critical CSS techniques');
    console.log();
  } else {
    console.log('✅ CSS bundle size is within recommended limits');
  }

  // Performance score
  let score = 100;
  if (totalJS > 1024 * 1024) score -= 20;
  if (totalCSS > 100 * 1024) score -= 10;
  if (largeJSFiles.length > 0) score -= largeJSFiles.length * 5;

  console.log(`🎯 Performance Score: ${score}/100`);
  
  if (score >= 90) {
    console.log('🎉 Excellent! Your bundle is well optimized.');
  } else if (score >= 70) {
    console.log('👍 Good! Some optimizations possible.');
  } else {
    console.log('⚠️  Bundle needs optimization attention.');
  }
}

// Run analysis
try {
  analyzeBundle();
} catch (error) {
  console.error('❌ Error analyzing bundle:', error.message);
  process.exit(1);
}