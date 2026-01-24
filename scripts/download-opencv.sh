#!/bin/bash
set -e

# OpenCV version to build
OPENCV_VERSION="4.13.0"

echo "=== Downloading OpenCV ${OPENCV_VERSION} ==="

# Clone OpenCV main repository
if [ ! -d "opencv" ]; then
    echo "Cloning opencv repository..."
    git clone --branch ${OPENCV_VERSION} --depth 1 https://github.com/opencv/opencv.git
else
    echo "opencv directory already exists, skipping clone"
fi

# Clone OpenCV contrib repository
if [ ! -d "opencv_contrib" ]; then
    echo "Cloning opencv_contrib repository..."
    git clone --branch ${OPENCV_VERSION} --depth 1 https://github.com/opencv/opencv_contrib.git
else
    echo "opencv_contrib directory already exists, skipping clone"
fi

# Apply patches for JavaScript bindings
echo ""
echo "=== Applying patches for JavaScript bindings ==="

# Function to enable JS bindings for a contrib module
enable_js_bindings() {
    local MODULE_NAME=$1
    local CMAKE_FILE="opencv_contrib/modules/${MODULE_NAME}/CMakeLists.txt"

    if [ -f "${CMAKE_FILE}" ]; then
        # Check various WRAP patterns and add js if not present
        if grep -q "WRAP.*js" "${CMAKE_FILE}"; then
            echo "  ${MODULE_NAME}: JS bindings already enabled"
        elif grep -q "WRAP python java objc)" "${CMAKE_FILE}"; then
            echo "  ${MODULE_NAME}: Enabling JS bindings..."
            sed -i 's/WRAP python java objc)/WRAP python java objc js)/g' "${CMAKE_FILE}"
        elif grep -q "WRAP python java)" "${CMAKE_FILE}"; then
            echo "  ${MODULE_NAME}: Enabling JS bindings..."
            sed -i 's/WRAP python java)/WRAP python java js)/g' "${CMAKE_FILE}"
        elif grep -q "WRAP python)" "${CMAKE_FILE}"; then
            echo "  ${MODULE_NAME}: Enabling JS bindings..."
            sed -i 's/WRAP python)/WRAP python js)/g' "${CMAKE_FILE}"
        elif grep -q "ocv_define_module" "${CMAKE_FILE}" && ! grep -q "WRAP" "${CMAKE_FILE}"; then
            echo "  ${MODULE_NAME}: Adding WRAP directive with JS bindings..."
            sed -i 's/ocv_define_module(\([^)]*\))/ocv_define_module(\1 WRAP js)/g' "${CMAKE_FILE}"
        else
            echo "  ${MODULE_NAME}: Could not determine WRAP pattern, skipping"
        fi
    else
        echo "  ${MODULE_NAME}: CMakeLists.txt not found, skipping"
    fi
}

# List of contrib modules to enable JS bindings for
MODULES=(
    # Feature detection & description
    "xfeatures2d"
    "ximgproc"
    "xphoto"
    "line_descriptor"
    "saliency"

    # Tracking & motion
    "tracking"
    "optflow"
    "bgsegm"

    # Recognition & DNN
    "face"
    "dnn_superres"
    "dnn_objdetect"

    # Markers & QR codes
    "aruco"
    "wechat_qrcode"
    "mcc"

    # Image analysis
    "img_hash"
    "quality"
    "bioinspired"
    "intensity_transform"

    # Advanced processing
    "fuzzy"
    "hfs"
    "phase_unwrapping"
    "reg"
    "signal"

    # Disabled - external dependencies
    # "text"      # requires Tesseract
    # "stereo"    # complex dependencies
    # "rgbd"      # 3D/depth dependencies
)

echo "Enabling JS bindings for contrib modules..."
for MODULE in "${MODULES[@]}"; do
    enable_js_bindings "${MODULE}"
done

# Apply custom opencv_js.config.py with all contrib module bindings
if [ -f "patches/opencv_js.config.py" ]; then
    echo ""
    echo "=== Applying custom JavaScript bindings config ==="
    cp patches/opencv_js.config.py opencv/platforms/js/opencv_js.config.py
    echo "  Applied patches/opencv_js.config.py"
fi

echo ""
echo "=== Download complete ==="
echo "OpenCV version: ${OPENCV_VERSION}"
echo "opencv directory: $(pwd)/opencv"
echo "opencv_contrib directory: $(pwd)/opencv_contrib"
