# opencv-contrib-wasm

Precompiled **OpenCV 4.13.0** with **all Contrib modules** to JavaScript + WebAssembly for Node.js, Deno, and browsers.

## Features

- **OpenCV 4.13.0** (latest stable)
- **All contrib modules** included (ArUco, face, xfeatures2d, etc.)
- **SIMD optimization** enabled for maximum performance
- **Threading support** enabled (SharedArrayBuffer)
- **Zero runtime dependencies**
- Works in **Node.js**, **Deno**, and **browsers**

## Quick Start

### Installation

```bash
npm install opencv-contrib-wasm
```

### Node.js (CommonJS)

```javascript
(async () => {
    const cv = await require('opencv-contrib-wasm');
    console.log('OpenCV.js version:', cv.getBuildInformation().match(/Version control:\s+(\S+)/)?.[1]);

    // Create a matrix
    const mat = new cv.Mat(100, 100, cv.CV_8UC3);
    mat.setTo(new cv.Scalar(255, 0, 0)); // Blue in BGR

    // Convert to grayscale
    const gray = new cv.Mat();
    cv.cvtColor(mat, gray, cv.COLOR_BGR2GRAY);
    console.log(`Grayscale: ${gray.rows}x${gray.cols}, channels: ${gray.channels()}`);

    // Clean up - IMPORTANT!
    mat.delete();
    gray.delete();
})();
```

### Node.js (ES Modules)

```javascript
import cvPromise from 'opencv-contrib-wasm';

const cv = await cvPromise;

// Detect ORB features
const img = new cv.Mat(200, 200, cv.CV_8UC1);
const orb = new cv.ORB();
const keypoints = new cv.KeyPointVector();
const descriptors = new cv.Mat();

orb.detectAndCompute(img, new cv.Mat(), keypoints, descriptors);
console.log(`Found ${keypoints.size()} keypoints`);

// Clean up
img.delete();
orb.delete();
keypoints.delete();
descriptors.delete();
```

### Browser

```html
<canvas id="canvas"></canvas>
<script src="node_modules/opencv-contrib-wasm/dist/opencv.js"></script>
<script>
    cv.onRuntimeInitialized = () => {
        console.log('OpenCV.js is ready!');

        // Load image from canvas
        const src = cv.imread('canvas');

        // Apply Gaussian blur
        const blurred = new cv.Mat();
        cv.GaussianBlur(src, blurred, new cv.Size(5, 5), 0);

        // Display result
        cv.imshow('canvas', blurred);

        // Clean up
        src.delete();
        blurred.delete();
    };
</script>
```

### Deno

```typescript
import cvPromise from 'npm:opencv-contrib-wasm';

const cv = await cvPromise;
console.log('OpenCV.js loaded in Deno!');
```

## Examples

### Node.js Examples

```bash
# Basic Mat operations
node examples/node/basic.js

# Image processing (blur, edges, threshold)
node examples/node/image-processing.js

# Feature detection (ORB, AKAZE, BRISK)
node examples/node/feature-detection.js

# ArUco marker detection
node examples/node/aruco-detection.js

# Contour detection
node examples/node/contours.js
```

### Browser Examples

Open these files in a browser (requires a local server for WASM loading):

```bash
# Start a local server
npx serve .

# Then open:
# http://localhost:3000/examples/browser/index.html      - Image processing
# http://localhost:3000/examples/browser/webcam.html     - Real-time webcam
# http://localhost:3000/examples/browser/aruco.html      - ArUco detection
```

## Included Modules

### Core OpenCV Modules

| Module | Description |
|--------|-------------|
| `core` | Basic structures (Mat, Scalar, Point, etc.) |
| `imgproc` | Image processing (filters, transforms, drawing) |
| `imgcodecs` | Image encoding/decoding |
| `calib3d` | Camera calibration, 3D reconstruction |
| `features2d` | Feature detection (ORB, BRISK, etc.) |
| `flann` | Fast approximate nearest neighbor search |
| `dnn` | Deep neural network inference |
| `ml` | Machine learning algorithms |
| `objdetect` | Object detection (cascade classifiers) |
| `photo` | Computational photography |
| `video` | Video analysis (optical flow, tracking) |

### Contrib Modules

| Module | Description |
|--------|-------------|
| `aruco` | ArUco markers detection and pose estimation |
| `bgsegm` | Background segmentation algorithms |
| `bioinspired` | Biologically inspired vision models |
| `face` | Face recognition algorithms |
| `img_hash` | Image hashing algorithms |
| `line_descriptor` | Line segment detection and description |
| `optflow` | Dense optical flow algorithms |
| `phase_unwrapping` | Phase unwrapping algorithms |
| `plot` | 2D plotting |
| `reg` | Image registration |
| `rgbd` | RGB-D camera processing |
| `saliency` | Saliency detection |
| `shape` | Shape matching and distance |
| `stereo` | Stereo correspondence |
| `structured_light` | Structured light processing |
| `superres` | Super resolution |
| `surface_matching` | 3D surface matching |
| `text` | Text detection and recognition |
| `tracking` | Object tracking algorithms |
| `xfeatures2d` | Extra 2D features (SIFT, SURF, etc.) |
| `ximgproc` | Extended image processing |
| `xobjdetect` | Extended object detection |
| `xphoto` | Extended photo processing |

## API Reference

### Creating Matrices

```javascript
// Empty matrix
const empty = new cv.Mat();

// Sized matrix with type
const mat = new cv.Mat(rows, cols, cv.CV_8UC3);

// From array data
const data = new Uint8Array([255, 0, 0, 0, 255, 0, 0, 0, 255]);
const fromArray = cv.matFromArray(3, 1, cv.CV_8UC3, data);

// Clone
const cloned = mat.clone();

// Region of interest
const roi = mat.roi(new cv.Rect(x, y, width, height));
```

### Common Operations

```javascript
// Color conversion
cv.cvtColor(src, dst, cv.COLOR_BGR2GRAY);
cv.cvtColor(src, dst, cv.COLOR_BGR2HSV);

// Blur
cv.GaussianBlur(src, dst, new cv.Size(5, 5), 0);
cv.medianBlur(src, dst, 5);
cv.bilateralFilter(src, dst, 9, 75, 75);

// Edge detection
cv.Canny(gray, edges, 50, 150);
cv.Sobel(gray, sobelX, cv.CV_64F, 1, 0, 3);
cv.Laplacian(gray, laplacian, cv.CV_64F);

// Threshold
cv.threshold(gray, binary, 127, 255, cv.THRESH_BINARY);
cv.adaptiveThreshold(gray, adaptive, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);

// Morphology
const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(5, 5));
cv.erode(src, dst, kernel);
cv.dilate(src, dst, kernel);
cv.morphologyEx(src, dst, cv.MORPH_OPEN, kernel);
```

### Feature Detection

```javascript
// ORB
const orb = new cv.ORB(500);
const keypoints = new cv.KeyPointVector();
const descriptors = new cv.Mat();
orb.detectAndCompute(gray, new cv.Mat(), keypoints, descriptors);

// AKAZE
const akaze = new cv.AKAZE();
akaze.detectAndCompute(gray, new cv.Mat(), keypoints, descriptors);

// Draw keypoints
cv.drawKeypoints(src, keypoints, output, new cv.Scalar(0, 255, 0));
```

### ArUco Markers

```javascript
// Create dictionary
const dictionary = cv.getPredefinedDictionary(cv.DICT_6X6_250);

// Generate marker
const marker = new cv.Mat();
cv.aruco_generateImageMarker(dictionary, 0, 200, marker, 1);

// Detect markers
const detector = new cv.aruco_ArucoDetector(dictionary, new cv.aruco_DetectorParameters());
const corners = new cv.MatVector();
const ids = new cv.Mat();
detector.detectMarkers(image, corners, ids);

// Draw detected markers
cv.aruco_drawDetectedMarkers(image, corners, ids);
```

### Contours

```javascript
const contours = new cv.MatVector();
const hierarchy = new cv.Mat();
cv.findContours(binary, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

// Draw all contours
cv.drawContours(dst, contours, -1, new cv.Scalar(0, 255, 0), 2);

// Contour properties
const area = cv.contourArea(contours.get(0));
const perimeter = cv.arcLength(contours.get(0), true);
const boundingRect = cv.boundingRect(contours.get(0));
```

## Memory Management

OpenCV.js uses Emscripten's memory model. **Always call `.delete()` on OpenCV objects when done:**

```javascript
const mat = new cv.Mat();
const keypoints = new cv.KeyPointVector();
const orb = new cv.ORB();

// ... use objects ...

// Clean up
mat.delete();
keypoints.delete();
orb.delete();
```

### Cleanup Pattern

```javascript
function processImage(src) {
    const mats = [];
    try {
        const gray = new cv.Mat();
        mats.push(gray);

        const edges = new cv.Mat();
        mats.push(edges);

        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.Canny(gray, edges, 50, 150);

        return edges.clone(); // Return a clone
    } finally {
        mats.forEach(m => m.delete());
    }
}
```

## Threading Support

Threading requires `SharedArrayBuffer`, which needs these HTTP headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Without these headers, OpenCV.js falls back to single-threaded mode.

### Express.js Example

```javascript
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});
```

## Building from Source

### Prerequisites

- Docker
- Git
- Node.js 16+

### Build Steps

```bash
# Clone repository
git clone https://github.com/user/build_openCVjs.git
cd build_openCVjs

# Download OpenCV sources
npm run download

# Build with Docker (takes ~30-60 minutes)
npm run build
```

### Build Output

| File | Description | Size |
|------|-------------|------|
| `dist/opencv.js` | JavaScript wrapper | ~145 KB |
| `dist/opencv_js.wasm` | WebAssembly binary | ~9.7 MB |
| `dist/loader.js` | Optional loader utility | ~4 KB |

## TypeScript

TypeScript definitions are included:

```typescript
import cv from 'opencv-contrib-wasm';

async function main() {
    const opencv = await cv;

    const mat: cv.Mat = new opencv.Mat(100, 100, opencv.CV_8UC3);
    const gray: cv.Mat = new opencv.Mat();

    opencv.cvtColor(mat, gray, opencv.COLOR_BGR2GRAY);

    mat.delete();
    gray.delete();
}
```

## Troubleshooting

### "WASM file not found"

Make sure the `dist/` folder contains both `opencv.js` and `opencv_js.wasm`. If building from source, run `npm run build` first.

### "SharedArrayBuffer is not defined"

Add the required COOP/COEP headers to your server. See the Threading Support section.

### "Out of memory"

Always call `.delete()` on OpenCV objects. OpenCV.js has limited memory (~256MB by default).

### Browser loading issues

Use a local HTTP server instead of `file://` URLs:

```bash
npx serve .
# or
python -m http.server 8000
```

## License

Apache-2.0 (same as OpenCV)

## Links

- [OpenCV](https://github.com/opencv/opencv) - Open Source Computer Vision Library
- [OpenCV Contrib](https://github.com/opencv/opencv_contrib) - Extra OpenCV modules
- [OpenCV.js Docs](https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html) - Official documentation
