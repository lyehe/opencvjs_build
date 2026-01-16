/**
 * OpenCV.js with Contrib Modules - ES Module Entry Point
 *
 * This module provides OpenCV 4.13.0 compiled to WebAssembly with:
 * - All contrib modules included
 * - SIMD optimization enabled
 * - Threading support (requires COOP/COEP headers in browser)
 *
 * Usage:
 *   import cvPromise from 'opencv-contrib-wasm';
 *   const cv = await cvPromise;
 *   // cv is now ready to use
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const opencvPath = join(__dirname, '..', 'dist', 'opencv.js');

if (!existsSync(opencvPath)) {
    throw new Error(
        'OpenCV WASM files not found. Please run "npm run build" first, ' +
        'or install the pre-built package from npm.'
    );
}

// Use createRequire for loading the OpenCV module
const require = createRequire(import.meta.url);
const cvPromise = require(opencvPath);

export default cvPromise;
