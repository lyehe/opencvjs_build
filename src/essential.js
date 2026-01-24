/**
 * OpenCV.js Essential Build - CommonJS Entry Point
 *
 * Lightweight build optimized for fast loading (~2-4MB WASM).
 *
 * Included features:
 * - Core Mat operations, DFT, math operations
 * - Image processing: blur, threshold, morphology, edge detection
 * - Feature detection: ORB, AKAZE, BRISK, corner detection
 * - Basic drawing: lines, circles, rectangles, text
 *
 * NOT included (use full build for these):
 * - DNN (neural network inference)
 * - Video analysis
 * - ML module
 * - Photo module (denoising, HDR)
 * - Object detection (Haar cascades)
 * - Contrib modules (SIFT, ArUco, etc.)
 * - Threading support
 *
 * Usage:
 *   const cvPromise = require('opencv-contrib-wasm/essential');
 *   const cv = await cvPromise;
 */

const path = require('path');
const fs = require('fs');

const opencvPath = path.join(__dirname, '..', 'dist', 'essential', 'opencv.js');

if (!fs.existsSync(opencvPath)) {
    throw new Error(
        'OpenCV Essential WASM files not found. Please run "npm run build:essential" first, ' +
        'or install the pre-built package from npm.'
    );
}

const cvPromise = require(opencvPath);

module.exports = cvPromise;
