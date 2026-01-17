# Contributing to opencv-contrib-wasm

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

### Prerequisites

- **Docker** - Required for building OpenCV.js
- **Git** - Version control
- **Node.js 16+** - Package management and running examples

### Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/lyehe/opencvjs_build.git
cd opencvjs_build
```

2. Download OpenCV sources:

```bash
npm run download
```

3. Build OpenCV.js:

```bash
npm run build
```

This takes approximately 30-60 minutes on first build.

## Project Structure

```
build_openCVjs/
├── .github/workflows/    # CI/CD configuration
├── dist/                 # Build output (opencv.js, opencv_js.wasm)
├── examples/
│   ├── browser/          # Browser demos
│   └── node/             # Node.js examples
├── scripts/
│   ├── build.sh          # Main build script
│   └── download-opencv.sh # Download OpenCV sources
├── src/
│   ├── index.js          # CommonJS entry
│   └── index.mjs         # ES Module entry
├── types/                # TypeScript definitions
├── Dockerfile            # Build environment
├── package.json
└── README.md
```

## Building

### Full Build

```bash
npm run build
```

### Build with Docker Manually

```bash
docker build -t opencv-wasm-builder .
docker run --rm -v "$(pwd)":/src opencv-wasm-builder bash scripts/build.sh
```

### Clean Build

```bash
npm run clean
npm run download
npm run build
```

## Adding Modules

OpenCV.js builds include modules based on the Emscripten binding configuration. To add or modify modules:

1. Edit `scripts/build.sh`
2. Add cmake options to enable/disable modules:

```bash
--cmake_option="-DBUILD_opencv_MODULE_NAME=ON" \
```

3. For contrib modules, they're automatically included via:

```bash
--cmake_option="-DOPENCV_EXTRA_MODULES_PATH=$(pwd)/opencv_contrib/modules"
```

### Common Module Options

| Module | CMake Option |
|--------|--------------|
| Core modules | Enabled by default |
| imgcodecs | `-DBUILD_opencv_imgcodecs=ON` |
| videoio | `-DBUILD_opencv_videoio=ON` |
| highgui | `-DBUILD_opencv_highgui=OFF` (no GUI in WASM) |
| dnn | `-DBUILD_opencv_dnn=ON` |
| ml | `-DBUILD_opencv_ml=ON` |

## Code Style

### JavaScript

- Use ES6+ features
- Prefer `const` over `let`
- Use descriptive variable names
- Add JSDoc comments for public functions

### Examples

- Include comprehensive comments explaining each step
- Always clean up OpenCV objects with `.delete()`
- Handle errors gracefully
- Follow the existing example structure

## Testing Examples

### Node.js

```bash
node examples/node/basic.js
node examples/node/image-processing.js
node examples/node/feature-detection.js
node examples/node/aruco-detection.js
node examples/node/contours.js
```

### Browser

Start a local server:

```bash
npx serve .
```

Then open:
- http://localhost:3000/examples/browser/index.html
- http://localhost:3000/examples/browser/webcam.html
- http://localhost:3000/examples/browser/aruco.html

## Pull Request Guidelines

1. **Create a feature branch:**

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes** and commit with clear messages:

```bash
git commit -m "Add feature: description of what you added"
```

3. **Test your changes:**
   - Run all Node.js examples
   - Test browser examples
   - Verify the build works

4. **Push and create PR:**

```bash
git push origin feature/your-feature-name
```

5. **PR description should include:**
   - What the change does
   - Why it's needed
   - How to test it

## Reporting Issues

When reporting issues, please include:

1. **Environment:**
   - Node.js version
   - Browser and version (for browser issues)
   - Operating system

2. **Steps to reproduce**

3. **Expected vs actual behavior**

4. **Error messages** (if any)

5. **Minimal code example** that reproduces the issue

## Feature Requests

For feature requests:

1. Check if it's already requested in Issues
2. Describe the use case
3. Explain why it would be useful
4. If possible, suggest an implementation approach

## Release Process

Releases are automated via GitHub Actions:

1. Create a git tag: `git tag v4.13.0`
2. Push the tag: `git push origin v4.13.0`
3. GitHub Actions will:
   - Build OpenCV.js
   - Create a GitHub Release
   - Publish to npm

## Questions?

Open an issue with the "question" label or start a discussion.

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 license.
