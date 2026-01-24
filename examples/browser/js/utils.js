/**
 * OpenCV.js Demo Utilities
 * Common helper functions for demos
 */

const Utils = {
    /**
     * Load an image from URL or file input
     * @param {string|File} source - Image URL or File object
     * @returns {Promise<HTMLImageElement>}
     */
    loadImage(source) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to load image'));

            if (source instanceof File) {
                img.src = URL.createObjectURL(source);
            } else {
                img.src = source;
            }
        });
    },

    /**
     * Convert HTMLImageElement to cv.Mat
     * @param {HTMLImageElement} img
     * @returns {cv.Mat}
     */
    imageToMat(img) {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        return cv.imread(canvas);
    },

    /**
     * Display cv.Mat on canvas
     * @param {cv.Mat} mat
     * @param {HTMLCanvasElement|string} canvasOrId
     */
    displayMat(mat, canvasOrId) {
        const canvas = typeof canvasOrId === 'string'
            ? document.getElementById(canvasOrId)
            : canvasOrId;
        cv.imshow(canvas, mat);
    },

    /**
     * Create a resized copy of mat (for performance)
     * @param {cv.Mat} mat
     * @param {number} maxDim - Maximum dimension
     * @returns {cv.Mat}
     */
    resizeForProcessing(mat, maxDim = 800) {
        const scale = Math.min(1, maxDim / Math.max(mat.rows, mat.cols));
        if (scale >= 1) {
            return mat.clone();
        }
        const resized = new cv.Mat();
        cv.resize(mat, resized, new cv.Size(0, 0), scale, scale, cv.INTER_AREA);
        return resized;
    },

    /**
     * Download canvas as image
     * @param {HTMLCanvasElement|string} canvasOrId
     * @param {string} filename
     */
    downloadCanvas(canvasOrId, filename = 'output.png') {
        const canvas = typeof canvasOrId === 'string'
            ? document.getElementById(canvasOrId)
            : canvasOrId;
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    },

    /**
     * Measure execution time of a function
     * @param {Function} fn - Function to measure
     * @param {string} label - Label for logging
     * @returns {*} Result of function
     */
    measureTime(fn, label = 'Operation') {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        const time = (end - start).toFixed(2);
        console.log(`${label}: ${time}ms`);
        return { result, time: parseFloat(time) };
    },

    /**
     * Async version of measureTime
     * @param {Function} fn - Async function to measure
     * @param {string} label - Label for logging
     * @returns {Promise<{result: *, time: number}>}
     */
    async measureTimeAsync(fn, label = 'Operation') {
        const start = performance.now();
        const result = await fn();
        const end = performance.now();
        const time = (end - start).toFixed(2);
        console.log(`${label}: ${time}ms`);
        return { result, time: parseFloat(time) };
    },

    /**
     * Delete multiple cv.Mat objects safely
     * @param {...cv.Mat} mats - Mat objects to delete
     */
    deleteMats(...mats) {
        mats.forEach(mat => {
            if (mat && !mat.isDeleted()) {
                try {
                    mat.delete();
                } catch (e) {
                    console.warn('Failed to delete mat:', e);
                }
            }
        });
    },

    /**
     * Create a canvas element with specified dimensions
     * @param {number} width
     * @param {number} height
     * @param {string} id - Optional ID
     * @returns {HTMLCanvasElement}
     */
    createCanvas(width, height, id = null) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        if (id) canvas.id = id;
        return canvas;
    },

    /**
     * Get webcam stream
     * @param {Object} constraints - MediaStreamConstraints
     * @returns {Promise<MediaStream>}
     */
    async getWebcam(constraints = { video: { facingMode: 'user', width: 640, height: 480 } }) {
        try {
            return await navigator.mediaDevices.getUserMedia(constraints);
        } catch (error) {
            throw new Error(`Webcam access denied: ${error.message}`);
        }
    },

    /**
     * Stop webcam stream
     * @param {MediaStream} stream
     */
    stopWebcam(stream) {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    },

    /**
     * Capture frame from video element to cv.Mat
     * @param {HTMLVideoElement} video
     * @returns {cv.Mat}
     */
    captureFrame(video) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        return cv.imread(canvas);
    },

    /**
     * Generate random color
     * @returns {cv.Scalar}
     */
    randomColor() {
        return new cv.Scalar(
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            255
        );
    },

    /**
     * Convert hex color to cv.Scalar
     * @param {string} hex - Hex color string (#RRGGBB)
     * @returns {cv.Scalar}
     */
    hexToScalar(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return new cv.Scalar(r, g, b, 255);
    },

    /**
     * Draw text with background on mat
     * @param {cv.Mat} mat
     * @param {string} text
     * @param {cv.Point} position
     * @param {Object} options
     */
    drawTextWithBackground(mat, text, position, options = {}) {
        const {
            fontScale = 0.6,
            thickness = 1,
            fontFace = cv.FONT_HERSHEY_SIMPLEX,
            textColor = new cv.Scalar(255, 255, 255, 255),
            bgColor = new cv.Scalar(0, 0, 0, 200),
            padding = 5
        } = options;

        const textSize = cv.getTextSize(text, fontFace, fontScale, thickness);
        const baseline = textSize.baseLine;
        const size = textSize.size;

        const pt1 = new cv.Point(
            position.x - padding,
            position.y - size.height - padding
        );
        const pt2 = new cv.Point(
            position.x + size.width + padding,
            position.y + baseline + padding
        );

        cv.rectangle(mat, pt1, pt2, bgColor, cv.FILLED);
        cv.putText(mat, text, position, fontFace, fontScale, textColor, thickness);
    },

    /**
     * Format bytes to human readable string
     * @param {number} bytes
     * @returns {string}
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    /**
     * Debounce function
     * @param {Function} fn
     * @param {number} delay
     * @returns {Function}
     */
    debounce(fn, delay = 300) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    /**
     * Throttle function
     * @param {Function} fn
     * @param {number} limit
     * @returns {Function}
     */
    throttle(fn, limit = 100) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Create histogram visualization
     * @param {cv.Mat} src - Source image
     * @param {HTMLCanvasElement} canvas - Output canvas
     * @param {string} channel - 'gray', 'r', 'g', 'b', or 'all'
     */
    drawHistogram(src, canvas, channel = 'gray') {
        const histSize = [256];
        const ranges = [0, 256];
        const histHeight = canvas.height;
        const histWidth = canvas.width;
        const binWidth = Math.floor(histWidth / 256);

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a24';
        ctx.fillRect(0, 0, histWidth, histHeight);

        const drawChannelHist = (mat, color) => {
            const hist = new cv.Mat();
            const srcVec = new cv.MatVector();
            srcVec.push_back(mat);
            cv.calcHist(srcVec, [0], new cv.Mat(), hist, histSize, ranges);
            cv.normalize(hist, hist, 0, histHeight, cv.NORM_MINMAX);

            ctx.strokeStyle = color;
            ctx.lineWidth = binWidth;
            ctx.beginPath();
            for (let i = 0; i < 256; i++) {
                const val = hist.data32F[i];
                ctx.moveTo(i * binWidth, histHeight);
                ctx.lineTo(i * binWidth, histHeight - val);
            }
            ctx.stroke();

            hist.delete();
            srcVec.delete();
        };

        if (channel === 'gray' || src.channels() === 1) {
            let gray = src;
            if (src.channels() > 1) {
                gray = new cv.Mat();
                cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
            }
            drawChannelHist(gray, '#9898a8');
            if (src.channels() > 1) gray.delete();
        } else {
            const channels = new cv.MatVector();
            cv.split(src, channels);

            if (channel === 'r' || channel === 'all') {
                drawChannelHist(channels.get(0), '#ef4444');
            }
            if (channel === 'g' || channel === 'all') {
                drawChannelHist(channels.get(1), '#10b981');
            }
            if (channel === 'b' || channel === 'all') {
                drawChannelHist(channels.get(2), '#3b82f6');
            }

            for (let i = 0; i < channels.size(); i++) {
                channels.get(i).delete();
            }
            channels.delete();
        }
    },

    /**
     * Load sample images paths
     * @returns {Object}
     */
    getSampleImages() {
        return {
            lena: '../images/lena.png',
            building: '../images/building.jpg',
            face: '../images/face.jpg',
            checkerboard: '../images/checkerboard.png',
            qrcode: '../images/qrcode.png',
            text: '../images/text.png'
        };
    },

    /**
     * Check if running on mobile device
     * @returns {boolean}
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Request fullscreen for element
     * @param {HTMLElement} element
     */
    requestFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    },

    /**
     * Copy text to clipboard
     * @param {string} text
     * @returns {Promise<void>}
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }
};

/**
 * WebcamManager - Manages webcam access and frame capture
 */
const WebcamManager = {
    stream: null,
    video: null,
    canvas: null,
    ctx: null,
    isRunning: false,
    frameCallback: null,
    animationId: null,
    fps: 0,
    lastFrameTime: 0,
    frameCount: 0,

    /**
     * Initialize webcam manager
     * @param {Object} options
     * @returns {Promise<HTMLVideoElement>}
     */
    async init(options = {}) {
        const {
            width = 640,
            height = 480,
            facingMode = 'user',
            videoElement = null
        } = options;

        // Create or use existing video element
        this.video = videoElement || document.createElement('video');
        this.video.setAttribute('playsinline', '');
        this.video.setAttribute('autoplay', '');
        this.video.muted = true;

        // Create canvas for frame capture
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: width },
                    height: { ideal: height },
                    facingMode: facingMode
                },
                audio: false
            });

            this.video.srcObject = this.stream;
            await this.video.play();

            // Set canvas size to match video
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight;

            this.isRunning = true;
            return this.video;
        } catch (error) {
            throw new Error(`Webcam access denied: ${error.message}`);
        }
    },

    /**
     * Start frame processing loop
     * @param {Function} callback - Called with cv.Mat for each frame
     */
    startProcessing(callback) {
        if (!this.isRunning) {
            console.warn('Webcam not initialized');
            return;
        }

        this.frameCallback = callback;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;

        const processFrame = () => {
            if (!this.isRunning) return;

            // Calculate FPS
            const now = performance.now();
            this.frameCount++;
            if (now - this.lastFrameTime >= 1000) {
                this.fps = this.frameCount;
                this.frameCount = 0;
                this.lastFrameTime = now;
            }

            // Capture frame
            this.ctx.drawImage(this.video, 0, 0);

            if (this.frameCallback && typeof cv !== 'undefined') {
                const mat = cv.imread(this.canvas);
                try {
                    this.frameCallback(mat, this.fps);
                } catch (e) {
                    console.error('Frame processing error:', e);
                }
                mat.delete();
            }

            this.animationId = requestAnimationFrame(processFrame);
        };

        processFrame();
    },

    /**
     * Capture a single frame as cv.Mat
     * @returns {cv.Mat|null}
     */
    captureFrame() {
        if (!this.isRunning || !this.video) return null;

        this.ctx.drawImage(this.video, 0, 0);
        return cv.imread(this.canvas);
    },

    /**
     * Capture frame as ImageData
     * @returns {ImageData|null}
     */
    captureImageData() {
        if (!this.isRunning || !this.video) return null;

        this.ctx.drawImage(this.video, 0, 0);
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    },

    /**
     * Stop processing but keep webcam running
     */
    stopProcessing() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.frameCallback = null;
    },

    /**
     * Stop webcam completely
     */
    stop() {
        this.stopProcessing();

        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }

        if (this.video) {
            this.video.srcObject = null;
        }

        this.isRunning = false;
    },

    /**
     * Get current video dimensions
     * @returns {Object}
     */
    getDimensions() {
        return {
            width: this.video?.videoWidth || 0,
            height: this.video?.videoHeight || 0
        };
    },

    /**
     * Check if webcam is available
     * @returns {Promise<boolean>}
     */
    async isAvailable() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices.some(device => device.kind === 'videoinput');
        } catch {
            return false;
        }
    },

    /**
     * Get list of available cameras
     * @returns {Promise<Array>}
     */
    async getCameras() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices.filter(device => device.kind === 'videoinput');
        } catch {
            return [];
        }
    },

    /**
     * Switch camera (for mobile devices)
     * @param {string} deviceId - Camera device ID
     */
    async switchCamera(deviceId) {
        const wasRunning = this.isRunning;
        const callback = this.frameCallback;

        this.stop();

        await this.init({
            width: this.canvas?.width || 640,
            height: this.canvas?.height || 480,
            deviceId: deviceId
        });

        if (wasRunning && callback) {
            this.startProcessing(callback);
        }
    }
};

// Export for use as module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, WebcamManager };
} else {
    window.Utils = Utils;
    window.WebcamManager = WebcamManager;
}
