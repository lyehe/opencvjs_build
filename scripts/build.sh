#!/bin/bash
set -e

# Configuration
OPENCV_VERSION="4.13.0"
BUILD_TYPE="${BUILD_TYPE:-full}"  # essential | full

echo "=== OpenCV.js Build System ==="
echo "Build type: ${BUILD_TYPE}"
echo "OpenCV version: ${OPENCV_VERSION}"

# Set build parameters based on BUILD_TYPE
case "$BUILD_TYPE" in
    essential)
        BUILD_DIR="build"
        OUTPUT_DIR="dist/essential"
        BUILD_FLAGS="--build_wasm --simd"
        CMAKE_OPTS=(
            "-DBUILD_opencv_dnn=OFF"
            "-DBUILD_opencv_video=OFF"
            "-DBUILD_opencv_ml=OFF"
            "-DBUILD_opencv_stitching=OFF"
            "-DBUILD_opencv_superres=OFF"
            "-DBUILD_opencv_videostab=OFF"
            "-DBUILD_opencv_photo=OFF"
            "-DBUILD_opencv_objdetect=OFF"
        )
        echo "Features: SIMD enabled, DNN/video/ml disabled"
        echo "Target size: ~2-4MB WASM"
        ;;
    full)
        BUILD_DIR="build"
        OUTPUT_DIR="dist/full"
        BUILD_FLAGS="--build_wasm --simd --threads"
        CMAKE_OPTS=(
            # Core modules
            "-DBUILD_opencv_dnn=ON"
            "-DBUILD_opencv_photo=ON"
            "-DBUILD_opencv_video=ON"
            "-DBUILD_opencv_ml=ON"
            "-DBUILD_opencv_objdetect=ON"
            "-DBUILD_opencv_stitching=ON"
            "-DBUILD_opencv_shape=ON"
            "-DBUILD_opencv_superres=ON"

            # Contrib modules - features
            "-DBUILD_opencv_xfeatures2d=ON"
            "-DBUILD_opencv_ximgproc=ON"
            "-DBUILD_opencv_xphoto=ON"
            "-DBUILD_opencv_line_descriptor=ON"
            "-DBUILD_opencv_saliency=ON"

            # Contrib modules - tracking & motion
            "-DBUILD_opencv_tracking=ON"
            "-DBUILD_opencv_optflow=ON"
            "-DBUILD_opencv_bgsegm=ON"

            # Contrib modules - recognition
            "-DBUILD_opencv_face=ON"
            "-DBUILD_opencv_dnn_superres=ON"
            "-DBUILD_opencv_dnn_objdetect=ON"

            # Contrib modules - markers & QR
            "-DBUILD_opencv_aruco=ON"
            "-DBUILD_opencv_wechat_qrcode=ON"
            "-DBUILD_opencv_mcc=ON"

            # Contrib modules - image analysis
            "-DBUILD_opencv_img_hash=ON"
            "-DBUILD_opencv_quality=ON"
            "-DBUILD_opencv_bioinspired=ON"
            "-DBUILD_opencv_intensity_transform=ON"

            # Contrib modules - advanced processing
            "-DBUILD_opencv_fuzzy=ON"
            "-DBUILD_opencv_hfs=ON"
            "-DBUILD_opencv_phase_unwrapping=ON"
            "-DBUILD_opencv_reg=ON"
            "-DBUILD_opencv_signal=ON"

            # Contrib modules - additional
            "-DBUILD_opencv_alphamat=ON"
            "-DBUILD_opencv_ccalib=ON"
            "-DBUILD_opencv_plot=ON"
            "-DBUILD_opencv_rapid=ON"
            "-DBUILD_opencv_structured_light=ON"
            "-DBUILD_opencv_surface_matching=ON"
            "-DBUILD_opencv_xobjdetect=ON"
            "-DBUILD_opencv_dpm=ON"

            # Note: text, stereo, rgbd, sfm disabled - require external deps or have WASM issues
            # "-DBUILD_opencv_text=ON"       # Requires Tesseract
            # "-DBUILD_opencv_stereo=ON"     # WASM issues
            # "-DBUILD_opencv_rgbd=ON"       # WASM issues
            # "-DBUILD_opencv_sfm=ON"        # Requires Ceres Solver

            # Enable non-free algorithms (SIFT, SURF, etc.)
            "-DOPENCV_ENABLE_NONFREE=ON"
            "-DOPENCV_EXTRA_MODULES_PATH=$(pwd)/opencv_contrib/modules"
        )
        echo "Features: SIMD + Threading, all core + contrib modules"
        echo "Modules: xfeatures2d, ximgproc, xphoto, tracking, optflow, face, bgsegm, saliency, etc."
        echo "Target size: ~15-25MB WASM"
        ;;
    *)
        echo "Error: Unknown BUILD_TYPE '${BUILD_TYPE}'"
        echo "Valid options: essential, full"
        exit 1
        ;;
esac

# Ensure opencv source exists
if [ ! -d "opencv" ]; then
    echo "Error: opencv directory not found. Run 'npm run download' first."
    exit 1
fi

# For full build, ensure contrib exists
if [ "$BUILD_TYPE" = "full" ] && [ ! -d "opencv_contrib" ]; then
    echo "Error: opencv_contrib directory not found. Run 'npm run download' first."
    exit 1
fi

# Create output directory
mkdir -p ${OUTPUT_DIR}

# Determine if we're inside Docker or need to run Docker
if [ -f /.dockerenv ] || grep -q docker /proc/1/cgroup 2>/dev/null; then
    echo "Running inside Docker container..."
    echo ""

    # Build command arguments
    BUILD_CMD="python3 ./opencv/platforms/js/build_js.py ${BUILD_DIR}"
    BUILD_CMD="${BUILD_CMD} ${BUILD_FLAGS}"
    BUILD_CMD="${BUILD_CMD} --disable_single_file"

    # Add common cmake options
    BUILD_CMD="${BUILD_CMD} --cmake_option=\"-DCMAKE_CXX_STANDARD=17\""
    BUILD_CMD="${BUILD_CMD} --cmake_option=\"-DBUILD_DOCS=OFF\""
    BUILD_CMD="${BUILD_CMD} --cmake_option=\"-DBUILD_EXAMPLES=OFF\""
    BUILD_CMD="${BUILD_CMD} --cmake_option=\"-DBUILD_TESTS=OFF\""
    BUILD_CMD="${BUILD_CMD} --cmake_option=\"-DBUILD_PERF_TESTS=OFF\""

    # Add build-type specific cmake options
    for opt in "${CMAKE_OPTS[@]}"; do
        BUILD_CMD="${BUILD_CMD} --cmake_option=\"${opt}\""
    done

    echo "Build command:"
    echo "${BUILD_CMD}"
    echo ""

    # Execute build
    eval ${BUILD_CMD}

    # Copy built files to output directory
    echo ""
    echo "Copying build artifacts to ${OUTPUT_DIR}..."

    # opencv.js is the UMD wrapper that loads opencv_js.wasm
    cp ${BUILD_DIR}/bin/opencv.js ${OUTPUT_DIR}/
    cp ${BUILD_DIR}/bin/opencv_js.wasm ${OUTPUT_DIR}/

    # Copy loader if present
    if [ -f "${BUILD_DIR}/bin/loader.js" ]; then
        cp ${BUILD_DIR}/bin/loader.js ${OUTPUT_DIR}/
    fi

    # Copy worker file if threading is enabled (full build only)
    if [ -f "${BUILD_DIR}/bin/opencv_js.worker.js" ]; then
        cp ${BUILD_DIR}/bin/opencv_js.worker.js ${OUTPUT_DIR}/
    fi

else
    echo "Running outside Docker, launching container..."

    # Build and run Docker container
    docker build -t opencv-wasm-builder .
    docker run --rm \
        -v "$(pwd)":/src \
        -u "$(id -u):$(id -g)" \
        -e BUILD_TYPE=${BUILD_TYPE} \
        opencv-wasm-builder \
        bash scripts/build.sh
fi

echo ""
echo "=== Build complete ==="
echo "Build type: ${BUILD_TYPE}"
echo "Output directory: ${OUTPUT_DIR}"
echo "Output files:"
ls -la ${OUTPUT_DIR}/
