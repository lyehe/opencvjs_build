/**
 * OpenCV.js with Contrib Modules - CommonJS Entry Point
 *
 * This module provides OpenCV 4.13.0 compiled to WebAssembly.
 *
 * Available builds:
 * - Essential (~3MB): Core image processing, fast loading
 * - Full (~12MB): All modules including contrib, DNN, threading
 *
 * Usage:
 *   // Default export (full build for backwards compatibility)
 *   const cvPromise = require('opencv-contrib-wasm');
 *   const cv = await cvPromise;
 *
 *   // Explicit build selection
 *   const cvEssential = require('opencv-contrib-wasm/essential');
 *   const cvFull = require('opencv-contrib-wasm/full');
 */

const path = require('path');
const fs = require('fs');

// Try full build first, fall back to essential if full doesn't exist
const fullPath = path.join(__dirname, '..', 'dist', 'full', 'opencv.js');
const essentialPath = path.join(__dirname, '..', 'dist', 'essential', 'opencv.js');

let opencvPath;

if (fs.existsSync(fullPath)) {
    opencvPath = fullPath;
} else if (fs.existsSync(essentialPath)) {
    console.warn(
        'opencv-contrib-wasm: Full build not found, using essential build. ' +
        'Some features (DNN, contrib modules, threading) may not be available.'
    );
    opencvPath = essentialPath;
} else {
    throw new Error(
        'OpenCV WASM files not found. Please run "npm run build" first, ' +
        'or install the pre-built package from npm.'
    );
}

const cvPromise = require(opencvPath);

module.exports = cvPromise;
