/**
 * OpenCV.js with Contrib Modules - CommonJS Entry Point
 *
 * This module provides OpenCV 4.13.0 compiled to WebAssembly with:
 * - All contrib modules included
 * - SIMD optimization enabled
 * - Threading support (requires COOP/COEP headers in browser)
 *
 * Usage:
 *   const cvPromise = require('opencv-contrib-wasm');
 *   const cv = await cvPromise;
 *   // cv is now ready to use
 */

const path = require('path');
const fs = require('fs');

// Determine the path to opencv.js
const opencvPath = path.join(__dirname, '..', 'dist', 'opencv.js');

// Check if the built file exists
if (!fs.existsSync(opencvPath)) {
    throw new Error(
        'OpenCV WASM files not found. Please run "npm run build" first, ' +
        'or install the pre-built package from npm.'
    );
}

// Load OpenCV - returns a Promise that resolves to the cv object
const cvPromise = require(opencvPath);

module.exports = cvPromise;
