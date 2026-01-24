/**
 * OpenCV.js Essential Build - ES Module Entry Point
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
 *   import cvPromise from 'opencv-contrib-wasm/essential';
 *   const cv = await cvPromise;
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const opencvPath = join(__dirname, '..', 'dist', 'essential', 'opencv.js');

if (!existsSync(opencvPath)) {
    throw new Error(
        'OpenCV Essential WASM files not found. Please run "npm run build:essential" first, ' +
        'or install the pre-built package from npm.'
    );
}

const require = createRequire(import.meta.url);
const cvPromise = require(opencvPath);

export default cvPromise;
