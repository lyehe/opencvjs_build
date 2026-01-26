/**
 * OpenCV.js Loader - Centralized loading with progress tracking
 */

const OpenCVLoader = {
    isLoaded: false,
    isLoading: false,
    loadPromise: null,
    callbacks: [],
    loadStartTime: null,

    /**
     * Load OpenCV.js with progress feedback
     * @param {Object} options - Configuration options
     * @param {string} options.buildType - 'full' or 'essential' (default: 'full')
     * @param {Function} options.onProgress - Progress callback (0-100)
     * @param {HTMLElement} options.statusElement - Element to update with status text
     * @returns {Promise} Resolves when OpenCV is ready
     */
    load(options = {}) {
        const {
            buildType = 'full',
            onProgress = null,
            statusElement = null
        } = options;

        // Already loaded
        if (this.isLoaded && typeof cv !== 'undefined') {
            return Promise.resolve(cv);
        }

        // Already loading, return existing promise
        if (this.isLoading && this.loadPromise) {
            return this.loadPromise;
        }

        this.isLoading = true;
        this.loadStartTime = performance.now();

        this.loadPromise = new Promise((resolve, reject) => {
            const updateStatus = (text) => {
                if (statusElement) {
                    statusElement.textContent = text;
                }
            };

            const updateProgress = (value) => {
                if (onProgress) {
                    onProgress(Math.min(100, Math.max(0, value)));
                }
            };

            updateStatus('Loading OpenCV.js...');
            updateProgress(10);

            // Determine script path based on build type (absolute from root)
            const scriptPath = buildType === 'essential'
                ? '/dist/essential/opencv.js'
                : '/dist/full/opencv.js';

            // Check if script already exists
            const existingScript = document.querySelector(`script[src*="opencv.js"]`);
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement('script');
            script.src = scriptPath;
            script.async = true;

            // Store reference to this for callbacks
            const self = this;

            // Simulate progress during load
            let progressInterval = setInterval(() => {
                const elapsed = performance.now() - self.loadStartTime;
                // Slowly increase progress, max out at 80% until actual load
                const simulatedProgress = Math.min(80, 10 + (elapsed / 100));
                updateProgress(simulatedProgress);
            }, 100);

            script.onload = function() {
                clearInterval(progressInterval);
                updateProgress(85);
                updateStatus('Initializing OpenCV...');
                console.log('OpenCV script loaded, cv type:', typeof cv);

                // Handle different OpenCV.js initialization patterns
                if (typeof cv === 'undefined') {
                    reject(new Error('cv is undefined after script load'));
                    return;
                }

                if (typeof cv === 'function') {
                    // Modern async factory pattern: cv is a function that returns a Promise
                    console.log('Using async factory pattern');
                    updateStatus('Initializing OpenCV WASM...');
                    cv().then(function(opencv) {
                        console.log('OpenCV initialized, Mat:', typeof opencv.Mat);
                        window.cv = opencv;
                        self.finishLoading(resolve, updateStatus, updateProgress);
                    }).catch(function(err) {
                        console.error('OpenCV init error:', err);
                        self.isLoading = false;
                        updateStatus('Failed to initialize: ' + err.message);
                        updateProgress(0);
                        reject(err);
                    });
                } else if (cv.Mat) {
                    // Already initialized (legacy pattern)
                    console.log('Already initialized');
                    self.finishLoading(resolve, updateStatus, updateProgress);
                } else if (typeof cv.then === 'function') {
                    // cv is a Promise
                    console.log('cv is a Promise');
                    cv.then(function(opencv) {
                        window.cv = opencv;
                        self.finishLoading(resolve, updateStatus, updateProgress);
                    }).catch(function(err) {
                        self.isLoading = false;
                        updateStatus('Failed to initialize: ' + err.message);
                        reject(err);
                    });
                } else {
                    // Poll for readiness
                    console.log('Polling for cv.Mat');
                    const checkReady = function() {
                        if (cv.Mat) {
                            self.finishLoading(resolve, updateStatus, updateProgress);
                        } else {
                            setTimeout(checkReady, 50);
                        }
                    };
                    checkReady();
                }
            };

            script.onerror = (error) => {
                clearInterval(progressInterval);
                this.isLoading = false;
                updateStatus('Failed to load OpenCV.js');
                updateProgress(0);
                reject(new Error(`Failed to load OpenCV.js from ${scriptPath}`));
            };

            document.head.appendChild(script);
        });

        return this.loadPromise;
    },

    finishLoading(resolve, updateStatus, updateProgress) {
        this.isLoaded = true;
        this.isLoading = false;

        const loadTime = ((performance.now() - this.loadStartTime) / 1000).toFixed(2);
        updateProgress(100);
        updateStatus(`OpenCV.js ready (${loadTime}s)`);

        // Log available modules
        console.log('OpenCV.js loaded successfully');
        this.logAvailableModules();

        // Execute any queued callbacks
        this.callbacks.forEach(cb => cb(cv));
        this.callbacks = [];

        resolve(cv);
    },

    /**
     * Register a callback to run when OpenCV is ready
     * @param {Function} callback - Function to call with cv object
     */
    onReady(callback) {
        if (this.isLoaded && typeof cv !== 'undefined') {
            callback(cv);
        } else {
            this.callbacks.push(callback);
        }
    },

    /**
     * Log available OpenCV modules to console
     */
    logAvailableModules() {
        if (typeof cv === 'undefined') return;

        const modules = {
            'Core': ['Mat', 'MatVector', 'Scalar', 'Point', 'Size', 'Rect'],
            'ImgProc': ['cvtColor', 'GaussianBlur', 'Canny', 'threshold', 'morphologyEx'],
            'Features2D': ['ORB', 'AKAZE', 'BRISK', 'SimpleBlobDetector'],
            'XFeatures2D': ['SIFT', 'SURF'],
            'ObjDetect': ['CascadeClassifier', 'HOGDescriptor', 'QRCodeDetector'],
            'Video': ['BackgroundSubtractorMOG2', 'calcOpticalFlowPyrLK'],
            'Tracking': ['TrackerKCF', 'TrackerCSRT'],
            'Photo': ['fastNlMeansDenoisingColored', 'createTonemapDrago'],
            'ArUco': ['Dictionary', 'detectMarkers', 'drawDetectedMarkers'],
            'Face': ['LBPHFaceRecognizer', 'EigenFaceRecognizer', 'FisherFaceRecognizer'],
            'XImgProc': ['createSuperpixelSLIC', 'createFastLineDetector'],
            'DNN': ['readNetFromONNX', 'blobFromImage'],
            'ML': ['KNearest', 'SVM', 'RTrees'],
            'Calib3D': ['calibrateCamera', 'solvePnP', 'findChessboardCorners'],
            'Stitching': ['Stitcher'],
            'ImgHash': ['pHash', 'averageHash', 'colorMomentHash'],
            'Quality': ['QualityPSNR', 'QualitySSIM'],
            'Saliency': ['StaticSaliencySpectralResidual', 'StaticSaliencyFineGrained']
        };

        console.group('Available OpenCV Modules');
        for (const [moduleName, functions] of Object.entries(modules)) {
            const available = functions.filter(f => {
                try {
                    return typeof cv[f] !== 'undefined' || typeof cv[`create${f}`] !== 'undefined';
                } catch {
                    return false;
                }
            });
            if (available.length > 0) {
                console.log(`${moduleName}: ${available.join(', ')}`);
            }
        }
        console.groupEnd();
    },

    /**
     * Check if a specific function/class is available
     * @param {string} name - Name of function or class
     * @returns {boolean}
     */
    hasFunction(name) {
        if (typeof cv === 'undefined') return false;
        return typeof cv[name] !== 'undefined';
    },

    /**
     * Get build info
     * @returns {Object} Build information
     */
    getBuildInfo() {
        if (typeof cv === 'undefined' || !cv.getBuildInformation) {
            return null;
        }
        return cv.getBuildInformation();
    }
};

// Export for use as module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OpenCVLoader;
} else {
    window.OpenCVLoader = OpenCVLoader;
}
