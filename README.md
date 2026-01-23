# opencv-contrib-wasm

[![npm version](https://img.shields.io/npm/v/opencv-contrib-wasm.svg)](https://www.npmjs.com/package/opencv-contrib-wasm)
[![License](https://img.shields.io/badge/license-Unlicense-blue.svg)](LICENSE)

Precompiled **OpenCV 4.13.0** with **all Contrib modules** compiled to JavaScript + WebAssembly for Node.js, Deno, and browsers.

## Features

- **OpenCV 4.13.0** - Latest stable release
- **Dual builds** - Essential (~3MB) for fast loading, Full (~12MB) for all features
- **All contrib modules** - ArUco, face recognition, xfeatures2d (SIFT/SURF), and more
- **SIMD optimization** - Hardware-accelerated operations
- **Multi-threading** - Web Workers support via SharedArrayBuffer (full build)
- **Cross-platform** - Node.js, Deno, and all modern browsers
- **TypeScript support** - Included type definitions
- **Zero dependencies** - Self-contained WASM binary

## Builds

| Build | WASM Size | Features | Use Case |
|-------|-----------|----------|----------|
| **Essential** | ~3MB | Core, imgproc, features2d | Web apps, fast loading |
| **Full** | ~12MB | All modules + contrib + DNN + threading | Full CV applications |

### Feature Comparison

| Feature | Essential | Full |
|---------|:---------:|:----:|
| **Core Modules** | | |
| Basic operations (Mat, Scalar, Point) | ✅ | ✅ |
| Image processing (blur, threshold, morphology) | ✅ | ✅ |
| Edge detection (Canny, Sobel, Laplacian) | ✅ | ✅ |
| Drawing functions (lines, shapes, text) | ✅ | ✅ |
| Color conversion (BGR, HSV, Lab) | ✅ | ✅ |
| Contour detection | ✅ | ✅ |
| Feature detection (ORB, AKAZE, BRISK) | ✅ | ✅ |
| Camera calibration (calib3d) | ✅ | ✅ |
| **Advanced Modules** | | |
| DNN (deep neural network inference) | ❌ | ✅ |
| Object detection (Haar, HOG) | ❌ | ✅ |
| Photo (denoising, HDR, inpainting) | ❌ | ✅ |
| Video analysis (optical flow, motion) | ❌ | ✅ |
| Machine learning (ml) | ❌ | ✅ |
| Image stitching | ❌ | ✅ |
| **Contrib Modules** | | |
| ArUco marker detection | ❌ | ✅ |
| SIFT/SURF (xfeatures2d) | ❌ | ✅ |
| Face recognition | ❌ | ✅ |
| Extended image processing (ximgproc) | ❌ | ✅ |
| Background segmentation (bgsegm) | ❌ | ✅ |
| Object tracking (KCF, CSRT) | ❌ | ✅ |
| Image hashing (pHash) | ❌ | ✅ |
| QR code detection | ❌ | ✅ |
| **Performance** | | |
| SIMD optimization | ✅ | ✅ |
| Multi-threading (Web Workers) | ❌ | ✅ |

## Installation

```bash
npm install opencv-contrib-wasm
```

```bash
yarn add opencv-contrib-wasm
```

```bash
pnpm add opencv-contrib-wasm
```

## Quick Start

### Choosing a Build

```javascript
// Essential build - smaller (~3MB), faster loading
import cv from 'opencv-contrib-wasm/essential';

// Full build - all features (~12MB), includes DNN, contrib, threading
import cv from 'opencv-contrib-wasm/full';

// Default (full build, backwards compatible)
import cv from 'opencv-contrib-wasm';
```

### Node.js (CommonJS)

```javascript
// Use essential build for basic image processing
const cvPromise = require('opencv-contrib-wasm/essential');

// Or use full build for all features
// const cvPromise = require('opencv-contrib-wasm/full');

(async () => {
    const cv = await cvPromise;

    // Create a 100x100 blue image
    const mat = new cv.Mat(100, 100, cv.CV_8UC3);
    mat.setTo(new cv.Scalar(255, 0, 0));

    console.log(`Created ${mat.rows}x${mat.cols} image`);

    // Always clean up!
    mat.delete();
})();
```

### Node.js (ES Modules)

```javascript
// Essential build for fast loading
import cvPromise from 'opencv-contrib-wasm/essential';

// Or full build for all features
// import cvPromise from 'opencv-contrib-wasm/full';

const cv = await cvPromise;

const mat = new cv.Mat(100, 100, cv.CV_8UC3);
console.log(`Created ${mat.rows}x${mat.cols} image`);
mat.delete();
```

### Browser (Script Tag)

```html
<!DOCTYPE html>
<html>
<head>
    <title>OpenCV.js Demo</title>
</head>
<body>
    <canvas id="canvas" width="400" height="300"></canvas>

    <!-- Essential build (faster loading) -->
    <script src="node_modules/opencv-contrib-wasm/dist/essential/opencv.js"></script>

    <!-- Or Full build (all features, requires COOP/COEP headers for threading) -->
    <!-- <script src="node_modules/opencv-contrib-wasm/dist/full/opencv.js"></script> -->

    <script>
        // Wait for OpenCV to initialize
        cv.onRuntimeInitialized = function() {
            console.log('OpenCV.js ready!');

            // Your code here
            const mat = new cv.Mat(100, 100, cv.CV_8UC4);
            mat.setTo(new cv.Scalar(255, 0, 0, 255));
            cv.imshow('canvas', mat);
            mat.delete();
        };
    </script>
</body>
</html>
```

### Browser (ES Modules)

```html
<script type="module">
    // Note: Requires a bundler or import map for npm packages
    const cv = await import('./node_modules/opencv-contrib-wasm/dist/essential/opencv.js');
    await new Promise(resolve => { cv.onRuntimeInitialized = resolve; });

    console.log('OpenCV.js ready!');
</script>
```

### Deno

```typescript
// Essential build
import cvPromise from 'npm:opencv-contrib-wasm/essential';

// Or full build
// import cvPromise from 'npm:opencv-contrib-wasm/full';

const cv = await cvPromise;
console.log('OpenCV.js ready in Deno!');
```

---

## JavaScript Usage Guide

### Understanding Mat (Matrix)

The `Mat` class is the core data structure in OpenCV. It represents images and matrices.

```javascript
// Create empty Mat
const empty = new cv.Mat();

// Create Mat with size and type
const mat = new cv.Mat(480, 640, cv.CV_8UC3);  // 640x480, 3 channels (BGR)

// Create Mat filled with zeros
const zeros = cv.Mat.zeros(100, 100, cv.CV_8UC1);

// Create Mat filled with ones
const ones = cv.Mat.ones(100, 100, cv.CV_8UC1);

// Create identity matrix
const eye = cv.Mat.eye(3, 3, cv.CV_32FC1);

// Clone a Mat
const clone = mat.clone();

// Get Mat properties
console.log('Rows:', mat.rows);
console.log('Cols:', mat.cols);
console.log('Channels:', mat.channels());
console.log('Type:', mat.type());
console.log('Total pixels:', mat.total());
console.log('Is empty:', mat.empty());
console.log('Is continuous:', mat.isContinuous());

// Access pixel data
const data = mat.data;        // Uint8Array for CV_8U types
const data32F = mat.data32F;  // Float32Array for CV_32F types

// Clean up - CRITICAL!
mat.delete();
zeros.delete();
ones.delete();
eye.delete();
clone.delete();
```

### Mat Types

```javascript
// Unsigned 8-bit (0-255) - Most common for images
cv.CV_8UC1   // 1 channel (grayscale)
cv.CV_8UC3   // 3 channels (BGR color)
cv.CV_8UC4   // 4 channels (BGRA with alpha)

// Signed 8-bit (-128 to 127)
cv.CV_8SC1, cv.CV_8SC3, cv.CV_8SC4

// Unsigned 16-bit (0-65535)
cv.CV_16UC1, cv.CV_16UC3, cv.CV_16UC4

// Signed 16-bit
cv.CV_16SC1, cv.CV_16SC3, cv.CV_16SC4

// 32-bit float - For precise calculations
cv.CV_32FC1, cv.CV_32FC3, cv.CV_32FC4

// 64-bit float
cv.CV_64FC1, cv.CV_64FC3, cv.CV_64FC4
```

### Creating Mat from Arrays

```javascript
// From Uint8Array
const data = new Uint8Array([255, 0, 0, 0, 255, 0, 0, 0, 255]);
const mat = cv.matFromArray(3, 1, cv.CV_8UC3, data);

// From ImageData (browser)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const mat = cv.matFromImageData(imageData);
```

### Region of Interest (ROI)

```javascript
const src = new cv.Mat(400, 400, cv.CV_8UC3);

// Extract a region (x=50, y=50, width=100, height=100)
const roi = src.roi(new cv.Rect(50, 50, 100, 100));

// Modify the ROI (affects original!)
roi.setTo(new cv.Scalar(0, 255, 0));

// Clean up
roi.delete();
src.delete();
```

### Helper Classes

```javascript
// Point (x, y)
const point = new cv.Point(100, 200);
console.log(point.x, point.y);

// Size (width, height)
const size = new cv.Size(640, 480);
console.log(size.width, size.height);

// Rect (x, y, width, height)
const rect = new cv.Rect(10, 20, 100, 50);
console.log(rect.x, rect.y, rect.width, rect.height);

// Scalar (v0, v1, v2, v3) - For colors
const blue = new cv.Scalar(255, 0, 0);      // BGR
const green = new cv.Scalar(0, 255, 0);
const red = new cv.Scalar(0, 0, 255);
const white = new cv.Scalar(255, 255, 255);
const black = new cv.Scalar(0, 0, 0);
```

---

## Common Operations

### Color Conversion

```javascript
const src = new cv.Mat(100, 100, cv.CV_8UC3);
const dst = new cv.Mat();

// BGR to Grayscale
cv.cvtColor(src, dst, cv.COLOR_BGR2GRAY);

// BGR to RGB
cv.cvtColor(src, dst, cv.COLOR_BGR2RGB);

// BGR to HSV
cv.cvtColor(src, dst, cv.COLOR_BGR2HSV);

// BGR to Lab
cv.cvtColor(src, dst, cv.COLOR_BGR2Lab);

// Grayscale to BGR
cv.cvtColor(gray, dst, cv.COLOR_GRAY2BGR);

// For browser canvas (RGBA)
cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
cv.cvtColor(gray, dst, cv.COLOR_GRAY2RGBA);

src.delete();
dst.delete();
```

### Image Filtering

```javascript
const src = new cv.Mat();
const dst = new cv.Mat();

// Gaussian Blur
cv.GaussianBlur(src, dst, new cv.Size(5, 5), 0);

// Median Blur (good for salt-and-pepper noise)
cv.medianBlur(src, dst, 5);

// Bilateral Filter (preserves edges)
cv.bilateralFilter(src, dst, 9, 75, 75);

// Box Filter (simple average)
cv.blur(src, dst, new cv.Size(5, 5));

// Sharpen using kernel
const kernel = cv.matFromArray(3, 3, cv.CV_32FC1, [
    0, -1, 0,
    -1, 5, -1,
    0, -1, 0
]);
cv.filter2D(src, dst, -1, kernel);
kernel.delete();

src.delete();
dst.delete();
```

### Edge Detection

```javascript
const src = new cv.Mat();
const gray = new cv.Mat();
const edges = new cv.Mat();

cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY);

// Canny Edge Detection
cv.Canny(gray, edges, 50, 150);

// Sobel (gradient in X or Y direction)
const sobelX = new cv.Mat();
const sobelY = new cv.Mat();
cv.Sobel(gray, sobelX, cv.CV_64F, 1, 0);  // X gradient
cv.Sobel(gray, sobelY, cv.CV_64F, 0, 1);  // Y gradient

// Laplacian
const laplacian = new cv.Mat();
cv.Laplacian(gray, laplacian, cv.CV_64F);

// Clean up
[src, gray, edges, sobelX, sobelY, laplacian].forEach(m => m.delete());
```

### Thresholding

```javascript
const src = new cv.Mat();
const gray = new cv.Mat();
const dst = new cv.Mat();

cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY);

// Binary threshold
cv.threshold(gray, dst, 127, 255, cv.THRESH_BINARY);

// Inverse binary
cv.threshold(gray, dst, 127, 255, cv.THRESH_BINARY_INV);

// Otsu's method (automatic threshold)
cv.threshold(gray, dst, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);

// Adaptive threshold
cv.adaptiveThreshold(
    gray, dst, 255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY,
    11,  // block size
    2    // C constant
);

[src, gray, dst].forEach(m => m.delete());
```

### Morphological Operations

```javascript
const src = new cv.Mat();
const dst = new cv.Mat();

// Create structuring element
const kernel = cv.getStructuringElement(
    cv.MORPH_RECT,       // MORPH_RECT, MORPH_CROSS, MORPH_ELLIPSE
    new cv.Size(5, 5)
);

// Erosion - shrinks bright regions
cv.erode(src, dst, kernel);

// Dilation - expands bright regions
cv.dilate(src, dst, kernel);

// Opening - erosion followed by dilation (removes noise)
cv.morphologyEx(src, dst, cv.MORPH_OPEN, kernel);

// Closing - dilation followed by erosion (fills holes)
cv.morphologyEx(src, dst, cv.MORPH_CLOSE, kernel);

// Gradient - difference between dilation and erosion
cv.morphologyEx(src, dst, cv.MORPH_GRADIENT, kernel);

// Top Hat - difference between input and opening
cv.morphologyEx(src, dst, cv.MORPH_TOPHAT, kernel);

// Black Hat - difference between closing and input
cv.morphologyEx(src, dst, cv.MORPH_BLACKHAT, kernel);

kernel.delete();
src.delete();
dst.delete();
```

### Drawing Functions

```javascript
const img = new cv.Mat(400, 400, cv.CV_8UC3, new cv.Scalar(255, 255, 255));

// Line
cv.line(img, new cv.Point(0, 0), new cv.Point(400, 400), new cv.Scalar(0, 0, 255), 2);

// Rectangle
cv.rectangle(img, new cv.Point(50, 50), new cv.Point(150, 150), new cv.Scalar(0, 255, 0), 2);
cv.rectangle(img, new cv.Point(200, 50), new cv.Point(300, 150), new cv.Scalar(0, 255, 0), -1);  // filled

// Circle
cv.circle(img, new cv.Point(200, 300), 50, new cv.Scalar(255, 0, 0), 2);
cv.circle(img, new cv.Point(300, 300), 30, new cv.Scalar(255, 0, 0), -1);  // filled

// Ellipse
cv.ellipse(img, new cv.Point(100, 300), new cv.Size(50, 30), 45, 0, 360, new cv.Scalar(255, 0, 255), 2);

// Polylines
const points = cv.matFromArray(4, 1, cv.CV_32SC2, [50, 200, 100, 250, 150, 200, 100, 150]);
const pts = new cv.MatVector();
pts.push_back(points);
cv.polylines(img, pts, true, new cv.Scalar(0, 128, 255), 2);

// Put Text
cv.putText(img, 'Hello OpenCV!', new cv.Point(50, 50), cv.FONT_HERSHEY_SIMPLEX, 1, new cv.Scalar(0, 0, 0), 2);

points.delete();
pts.delete();
img.delete();
```

---

## Feature Detection

### ORB (Oriented FAST and Rotated BRIEF)

```javascript
const img = new cv.Mat();
const gray = new cv.Mat();
cv.cvtColor(img, gray, cv.COLOR_BGR2GRAY);

// Create ORB detector
const orb = new cv.ORB(500);  // max 500 features

// Detect keypoints and compute descriptors
const keypoints = new cv.KeyPointVector();
const descriptors = new cv.Mat();
orb.detectAndCompute(gray, new cv.Mat(), keypoints, descriptors);

console.log(`Found ${keypoints.size()} keypoints`);

// Access keypoint properties
for (let i = 0; i < keypoints.size(); i++) {
    const kp = keypoints.get(i);
    console.log(`  Point: (${kp.pt.x}, ${kp.pt.y}), size: ${kp.size}, angle: ${kp.angle}`);
}

// Draw keypoints
const output = new cv.Mat();
cv.drawKeypoints(img, keypoints, output, new cv.Scalar(0, 255, 0));

// Clean up
[img, gray, descriptors, output].forEach(m => m.delete());
keypoints.delete();
orb.delete();
```

### AKAZE

```javascript
const akaze = new cv.AKAZE();
const keypoints = new cv.KeyPointVector();
const descriptors = new cv.Mat();

akaze.detectAndCompute(gray, new cv.Mat(), keypoints, descriptors);

keypoints.delete();
descriptors.delete();
akaze.delete();
```

### Feature Matching

```javascript
// Detect features in two images
const orb = new cv.ORB(500);
const kp1 = new cv.KeyPointVector();
const kp2 = new cv.KeyPointVector();
const desc1 = new cv.Mat();
const desc2 = new cv.Mat();

orb.detectAndCompute(img1, new cv.Mat(), kp1, desc1);
orb.detectAndCompute(img2, new cv.Mat(), kp2, desc2);

// Match with BFMatcher
const bf = new cv.BFMatcher(cv.NORM_HAMMING, true);
const matches = new cv.DMatchVector();
bf.match(desc1, desc2, matches);

console.log(`Found ${matches.size()} matches`);

// Sort by distance
const matchArray = [];
for (let i = 0; i < matches.size(); i++) {
    const m = matches.get(i);
    matchArray.push({ queryIdx: m.queryIdx, trainIdx: m.trainIdx, distance: m.distance });
}
matchArray.sort((a, b) => a.distance - b.distance);

// Clean up
[desc1, desc2].forEach(m => m.delete());
[kp1, kp2, matches].forEach(v => v.delete());
bf.delete();
orb.delete();
```

---

## Contour Detection

```javascript
const src = new cv.Mat();
const gray = new cv.Mat();
const binary = new cv.Mat();

cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY);
cv.threshold(gray, binary, 127, 255, cv.THRESH_BINARY);

// Find contours
const contours = new cv.MatVector();
const hierarchy = new cv.Mat();
cv.findContours(binary, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

console.log(`Found ${contours.size()} contours`);

// Draw all contours
const output = src.clone();
cv.drawContours(output, contours, -1, new cv.Scalar(0, 255, 0), 2);

// Analyze each contour
for (let i = 0; i < contours.size(); i++) {
    const contour = contours.get(i);

    // Area and perimeter
    const area = cv.contourArea(contour);
    const perimeter = cv.arcLength(contour, true);

    // Bounding rectangle
    const rect = cv.boundingRect(contour);

    // Convex hull
    const hull = new cv.Mat();
    cv.convexHull(contour, hull);

    // Centroid using moments
    const moments = cv.moments(contour);
    const cx = moments.m10 / moments.m00;
    const cy = moments.m01 / moments.m00;

    console.log(`Contour ${i}: area=${area.toFixed(0)}, perimeter=${perimeter.toFixed(0)}`);

    hull.delete();
}

// Clean up
[src, gray, binary, output, hierarchy].forEach(m => m.delete());
contours.delete();
```

---

## ArUco Marker Detection

```javascript
// Create dictionary
const dictionary = cv.getPredefinedDictionary(cv.DICT_6X6_250);

// Generate a marker image
const markerImage = new cv.Mat();
cv.generateImageMarker(dictionary, 23, 200, markerImage, 1);  // ID 23, 200px

// Create detector
const detectorParams = new cv.aruco_DetectorParameters();
const refineParams = new cv.aruco_RefineParameters(10.0, 3.0, true);
const detector = new cv.aruco_ArucoDetector(dictionary, detectorParams, refineParams);

// Detect markers in image
const corners = new cv.MatVector();
const ids = new cv.Mat();
const rejected = new cv.MatVector();

detector.detectMarkers(image, corners, ids, rejected);

console.log(`Detected ${ids.rows} markers`);

// Draw detected markers
if (ids.rows > 0) {
    cv.drawDetectedMarkers(image, corners, ids);

    // Access marker data
    for (let i = 0; i < ids.rows; i++) {
        const markerId = ids.intAt(i, 0);
        const markerCorners = corners.get(i);
        console.log(`Marker ID ${markerId}`);
    }
}

// Clean up
[markerImage, ids].forEach(m => m.delete());
[corners, rejected].forEach(v => v.delete());
[dictionary, detectorParams, refineParams, detector].forEach(o => o.delete());
```

---

## Browser-Specific: Canvas Integration

### Reading from Canvas

```javascript
// Read image from canvas element
const canvas = document.getElementById('myCanvas');
const src = cv.imread(canvas);  // or cv.imread('myCanvas')

// Process...

// Display result
cv.imshow('outputCanvas', src);

src.delete();
```

### Reading from Image Element

```javascript
const imgElement = document.getElementById('myImage');

// Draw to canvas first
const canvas = document.createElement('canvas');
canvas.width = imgElement.naturalWidth;
canvas.height = imgElement.naturalHeight;
const ctx = canvas.getContext('2d');
ctx.drawImage(imgElement, 0, 0);

// Now read from canvas
const src = cv.imread(canvas);

// Process and display
cv.imshow('outputCanvas', src);

src.delete();
```

### Video Processing

```javascript
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

// Set canvas size to match video
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

function processFrame() {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const src = cv.imread(canvas);
    const gray = new cv.Mat();

    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    cv.imshow(canvas, gray);

    src.delete();
    gray.delete();

    requestAnimationFrame(processFrame);
}

video.onplay = () => processFrame();
```

---

## Memory Management

OpenCV.js uses WebAssembly memory that must be manually freed.

### Rules

1. **Always call `.delete()`** on OpenCV objects when done
2. **Never let objects go out of scope** without deleting
3. **Track all created objects** in complex functions

### Cleanup Pattern

```javascript
function processImage(inputMat) {
    const mats = [];

    try {
        const gray = new cv.Mat();
        mats.push(gray);

        const blurred = new cv.Mat();
        mats.push(blurred);

        const edges = new cv.Mat();
        mats.push(edges);

        cv.cvtColor(inputMat, gray, cv.COLOR_BGR2GRAY);
        cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);
        cv.Canny(blurred, edges, 50, 150);

        return edges.clone();  // Return a clone
    } finally {
        // Always clean up
        mats.forEach(m => m.delete());
    }
}

// Usage
const result = processImage(src);
// ... use result ...
result.delete();
```

### Using try/finally

```javascript
const src = new cv.Mat(100, 100, cv.CV_8UC3);
try {
    // Process...
} finally {
    src.delete();
}
```

---

## Threading Support

Threading requires `SharedArrayBuffer`, which needs specific HTTP headers.

### Required Headers

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

### Express.js

```javascript
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});
```

### Nginx

```nginx
add_header Cross-Origin-Opener-Policy same-origin;
add_header Cross-Origin-Embedder-Policy require-corp;
```

### Apache

```apache
Header set Cross-Origin-Opener-Policy "same-origin"
Header set Cross-Origin-Embedder-Policy "require-corp"
```

Without these headers, OpenCV.js falls back to single-threaded mode automatically.

---

## Included Modules

### Essential Build Modules

| Module | Description | Web Use Case |
|--------|-------------|--------------|
| `core` | Mat, Scalar, Point, Size, basic operations | Foundation for all CV |
| `imgproc` | Filters, transforms, drawing, contours | Image manipulation |
| `imgcodecs` | Image encoding/decoding | Load/save images |
| `calib3d` | Camera calibration, 3D reconstruction | AR applications |
| `features2d` | ORB, BRISK, AKAZE detection | Image matching |
| `flann` | Fast nearest neighbor search | Feature matching |

### Full Build - Additional Core Modules

| Module | Description | Web Use Case |
|--------|-------------|--------------|
| `dnn` | Deep neural network inference | ML in browser (TensorFlow, ONNX) |
| `ml` | Machine learning algorithms | Classification, clustering |
| `objdetect` | Haar cascades, HOG descriptors | Face/object detection |
| `photo` | Denoising, HDR, inpainting | Photo enhancement |
| `video` | Optical flow, motion analysis | Video/webcam processing |
| `stitching` | Image stitching | Panorama creation |

### Full Build - Contrib Modules

| Module | Description | Web Use Case |
|--------|-------------|--------------|
| `aruco` | ArUco/ChArUco marker detection | AR markers, camera pose |
| `xfeatures2d` | SIFT, SURF (non-free) | Better feature matching |
| `face` | Face recognition (LBPH, Eigen, Fisher) | Identity verification |
| `tracking` | KCF, CSRT, MIL trackers | Object tracking in video |
| `bgsegm` | Background subtraction | Motion detection, webcam |
| `ximgproc` | Edge-preserving filters, superpixels | Advanced segmentation |
| `xphoto` | White balance, denoising | Photo correction |
| `img_hash` | pHash, average hash | Image deduplication |
| `wechat_qrcode` | QR code detection | Barcode scanning |
| `optflow` | Dense optical flow | Motion analysis |
| `line_descriptor` | Line segment detection | Structure detection |
| `saliency` | Saliency detection | Focus detection |
| `quality` | Image quality assessment | Quality metrics |
| `bioinspired` | Retina-inspired processing | Enhancement |
| `dnn_superres` | DNN-based super resolution | Image upscaling |
| `dnn_objdetect` | DNN object detection | YOLO, SSD models |
| `alphamat` | Alpha matting | Image segmentation |
| `ccalib` | Custom calibration patterns | Camera calibration |
| `plot` | 1D/2D plotting | Data visualization |
| `rapid` | Silhouette-based 3D tracking | 3D object tracking |
| `structured_light` | Structured light patterns | 3D scanning |
| `surface_matching` | 3D point pair features | 3D object recognition |
| `xobjdetect` | Waldboost cascade detection | Object detection |
| `dpm` | Deformable parts model | Object detection |

### Not Included (WASM Limitations)

| Module | Reason |
|--------|--------|
| `text` | Requires Tesseract OCR binary |
| `stereo` | WASM compatibility issues |
| `rgbd` | WASM compatibility issues |
| `sfm` | Requires Ceres Solver |
| `cuda*` | No GPU access in WASM |
| `viz`, `ovis` | Require native 3D libraries |
| `hdf` | Requires HDF5 library |
| `freetype` | Browser handles fonts natively |

---

## Examples

### Interactive Demo

Try the interactive feature demo that showcases 20+ OpenCV operations:

```bash
npx serve .
# Open http://localhost:3000/examples/browser/demo.html
```

**Features demonstrated:**
- **Basic Filters:** Grayscale, Blur, Sharpen
- **Edge Detection:** Canny, Sobel, Laplacian
- **Morphology:** Dilate, Erode, Opening, Closing
- **Thresholding:** Binary, Adaptive, Otsu's Method
- **Feature Detection:** Contours, Harris Corners, ORB Keypoints
- **Color Operations:** HSV, Histogram Equalization, Invert

### Code Examples

See the `examples/` directory:

```bash
# Node.js
node examples/node/basic.js
node examples/node/image-processing.js
node examples/node/feature-detection.js
node examples/node/aruco-detection.js
node examples/node/contours.js

# Browser (start local server first)
npx serve .
# Open http://localhost:3000/examples/browser/
```

| Example | Description |
|---------|-------------|
| `demo.html` | Interactive demo with 20+ filters |
| `index.html` | Basic image processing |
| `webcam.html` | Real-time webcam processing |
| `aruco.html` | ArUco marker detection |

---

## Building from Source

```bash
git clone https://github.com/lyehe/opencvjs_build.git
cd opencvjs_build

# Download OpenCV sources
npm run download

# Build both versions (requires Docker)
npm run build

# Or build individually
npm run build:essential  # Essential build only (~3MB)
npm run build:full       # Full build only (~12MB)

# Clean build artifacts
npm run clean
```

### Build Output

```
dist/
├── essential/
│   ├── opencv.js           (~150KB)
│   └── opencv_js.wasm      (~3MB)
├── full/
│   ├── opencv.js           (~200KB)
│   ├── opencv_js.wasm      (~12MB)
│   └── opencv_js.worker.js (threading)
└── README.md
```

---

## Troubleshooting

### "WASM file not found"

Ensure the build files exist in `dist/essential/` or `dist/full/`. Run `npm run build` if building from source.

### "SharedArrayBuffer is not defined"

Add COOP/COEP headers to your server. See Threading Support section.

### "Out of memory"

Always call `.delete()` on OpenCV objects. Check for memory leaks.

### Browser: "Cannot load from file://"

Use a local HTTP server:

```bash
npx serve .
# or
python -m http.server 8000
```

---

## License

This project's build scripts and wrapper code are released into the public domain under the [Unlicense](LICENSE).

The compiled WebAssembly binaries contain code from:

| Component | License |
|-----------|---------|
| OpenCV | Apache-2.0 |
| OpenCV Contrib | Apache-2.0 (some modules BSD-3-Clause) |

See [licenses/](licenses/) for full license texts.

## Links

- [OpenCV Documentation](https://docs.opencv.org/4.x/)
- [OpenCV.js Tutorials](https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html)
- [GitHub Repository](https://github.com/lyehe/opencvjs_build)
- [npm Package](https://www.npmjs.com/package/opencv-contrib-wasm)
