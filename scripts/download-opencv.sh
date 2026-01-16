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

echo "=== Download complete ==="
echo "OpenCV version: ${OPENCV_VERSION}"
echo "opencv directory: $(pwd)/opencv"
echo "opencv_contrib directory: $(pwd)/opencv_contrib"
