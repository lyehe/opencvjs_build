# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.13.0] - 2024-01-16

### Added

- Initial release with OpenCV 4.13.0
- All OpenCV contrib modules included
- SIMD optimization enabled
- Multi-threading support via SharedArrayBuffer
- TypeScript type definitions
- CommonJS and ES Module entry points
- Comprehensive examples for Node.js and browsers

### Core Modules

- `core` - Basic structures and operations
- `imgproc` - Image processing
- `imgcodecs` - Image encoding/decoding
- `calib3d` - Camera calibration
- `features2d` - Feature detection (ORB, BRISK, AKAZE)
- `flann` - Fast nearest neighbor search
- `dnn` - Deep neural networks
- `ml` - Machine learning
- `objdetect` - Object detection
- `photo` - Computational photography
- `video` - Video analysis

### Contrib Modules

- `aruco` - ArUco marker detection
- `bgsegm` - Background segmentation
- `bioinspired` - Bio-inspired vision
- `face` - Face recognition
- `img_hash` - Image hashing
- `line_descriptor` - Line detection
- `optflow` - Optical flow
- `phase_unwrapping` - Phase unwrapping
- `plot` - 2D plotting
- `reg` - Image registration
- `rgbd` - RGB-D processing
- `saliency` - Saliency detection
- `shape` - Shape matching
- `stereo` - Stereo correspondence
- `structured_light` - Structured light
- `superres` - Super resolution
- `surface_matching` - 3D surface matching
- `text` - Text detection
- `tracking` - Object tracking
- `xfeatures2d` - Extra 2D features (SIFT, SURF)
- `ximgproc` - Extended image processing
- `xobjdetect` - Extended object detection
- `xphoto` - Extended photo processing

### Build Configuration

- Emscripten with WASM output
- SIMD enabled (`--simd`)
- Threading enabled (`--threads`)
- C++17 standard
- Separate WASM file (not embedded)

### Documentation

- Comprehensive README with JavaScript usage guide
- Node.js examples (5 files)
- Browser examples (3 files)
- TypeScript definitions
- Contributing guidelines

---

## Version History

| Version | OpenCV | Date | Notes |
|---------|--------|------|-------|
| 4.13.0 | 4.13.0 | 2024-01-16 | Initial release |
