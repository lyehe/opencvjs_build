FROM emscripten/emsdk:latest

LABEL maintainer="opencv-contrib-wasm"
LABEL description="Build environment for OpenCV.js with contrib modules"

WORKDIR /src

# Install additional dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    git \
    cmake \
    && rm -rf /var/lib/apt/lists/*

# Set default command to run the build script
CMD ["bash", "scripts/build.sh"]
