/**
 * OpenCV.js with Contrib Modules - ES Module Entry Point
 *
 * This module provides OpenCV 4.13.0 compiled to WebAssembly.
 *
 * Available builds:
 * - Essential (~3MB): Core image processing, fast loading
 * - Full (~12MB): All modules including contrib, DNN, threading
 *
 * Usage:
 *   // Default export (full build for backwards compatibility)
 *   import cvPromise from 'opencv-contrib-wasm';
 *   const cv = await cvPromise;
 *
 *   // Explicit build selection
 *   import cvEssential from 'opencv-contrib-wasm/essential';
 *   import cvFull from 'opencv-contrib-wasm/full';
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try full build first, fall back to essential if full doesn't exist
const fullPath = join(__dirname, '..', 'dist', 'full', 'opencv.js');
const essentialPath = join(__dirname, '..', 'dist', 'essential', 'opencv.js');

let opencvPath;

if (existsSync(fullPath)) {
    opencvPath = fullPath;
} else if (existsSync(essentialPath)) {
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

const require = createRequire(import.meta.url);
const cvPromise = require(opencvPath);

export default cvPromise;
