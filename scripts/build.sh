#!/bin/bash
set -e

# Configuration
OPENCV_VERSION="4.13.0"
BUILD_DIR="build"
DIST_DIR="dist"

echo "=== Building OpenCV.js ${OPENCV_VERSION} with Contrib Modules ==="
echo "Features: SIMD + Threading enabled"

# Ensure opencv source exists
if [ ! -d "opencv" ]; then
    echo "Error: opencv directory not found. Run 'npm run download' first."
    exit 1
fi

if [ ! -d "opencv_contrib" ]; then
    echo "Error: opencv_contrib directory not found. Run 'npm run download' first."
    exit 1
fi

# Create dist directory
mkdir -p ${DIST_DIR}

# Determine if we're inside Docker or need to run Docker
if [ -f /.dockerenv ] || grep -q docker /proc/1/cgroup 2>/dev/null; then
    echo "Running inside Docker container..."

    # Build OpenCV.js with contrib, SIMD, and threading
    python3 ./opencv/platforms/js/build_js.py ${BUILD_DIR} \
        --build_wasm \
        --disable_single_file \
        --simd \
        --threads \
        --cmake_option="-DOPENCV_EXTRA_MODULES_PATH=$(pwd)/opencv_contrib/modules" \
        --cmake_option="-DCMAKE_CXX_STANDARD=17" \
        --cmake_option="-DBUILD_DOCS=OFF" \
        --cmake_option="-DBUILD_EXAMPLES=OFF" \
        --cmake_option="-DBUILD_TESTS=OFF" \
        --cmake_option="-DBUILD_PERF_TESTS=OFF"

    # Copy built files to dist
    # opencv.js is the UMD wrapper that loads opencv_js.wasm
    cp ${BUILD_DIR}/bin/opencv.js ${DIST_DIR}/
    cp ${BUILD_DIR}/bin/opencv_js.wasm ${DIST_DIR}/

    # Copy loader if present
    if [ -f "${BUILD_DIR}/bin/loader.js" ]; then
        cp ${BUILD_DIR}/bin/loader.js ${DIST_DIR}/
    fi

    # Copy worker file if threading is enabled
    if [ -f "${BUILD_DIR}/bin/opencv_js.worker.js" ]; then
        cp ${BUILD_DIR}/bin/opencv_js.worker.js ${DIST_DIR}/
    fi

else
    echo "Running outside Docker, launching container..."

    # Build and run Docker container
    docker build -t opencv-wasm-builder .
    docker run --rm \
        -v "$(pwd)":/src \
        -u "$(id -u):$(id -g)" \
        opencv-wasm-builder \
        bash scripts/build.sh
fi

echo "=== Build complete ==="
echo "Output files:"
ls -la ${DIST_DIR}/
