/**
 * OpenCV.js Full Build - ES Module Entry Point
 *
 * Complete build with all features (~10-15MB WASM).
 *
 * Included features:
 * - Everything in Essential build
 * - DNN: Neural network inference (ONNX, TensorFlow, Caffe)
 * - Photo: Denoising (fastNlMeans), HDR, inpainting
 * - Object Detection: Haar cascades, HOG, QR codes
 * - Video: Optical flow, background subtraction
 * - ML: Machine learning algorithms
 * - Contrib modules: xfeatures2d (SIFT), ximgproc, aruco, etc.
 * - Threading: Web Workers for parallel processing
 *
 * Usage:
 *   import cvPromise from 'opencv-contrib-wasm/full';
 *   const cv = await cvPromise;
 *
 * Note: Threading requires COOP/COEP headers in browser:
 *   Cross-Origin-Opener-Policy: same-origin
 *   Cross-Origin-Embedder-Policy: require-corp
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const opencvPath = join(__dirname, '..', 'dist', 'full', 'opencv.js');

if (!existsSync(opencvPath)) {
    throw new Error(
        'OpenCV Full WASM files not found. Please run "npm run build:full" first, ' +
        'or install the pre-built package from npm.'
    );
}

const require = createRequire(import.meta.url);
const cvPromise = require(opencvPath);

export default cvPromise;
