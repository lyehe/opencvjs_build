/**
 * OpenCV.js Demo UI Components
 * Reusable UI components for demos
 */

const UIComponents = {
    /**
     * Create loading overlay
     * @returns {HTMLElement}
     */
    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.id = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner"></div>
            <div class="loading-text" id="loading-status">Loading OpenCV.js...</div>
            <div class="loading-progress">
                <div class="loading-progress-bar" id="loading-progress" style="width: 0%"></div>
            </div>
        `;
        return overlay;
    },

    /**
     * Update loading progress
     * @param {number} percent - 0-100
     */
    updateLoadingProgress(percent) {
        const progressBar = document.getElementById('loading-progress');
        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }
    },

    /**
     * Update loading status text
     * @param {string} text
     */
    updateLoadingStatus(text) {
        const status = document.getElementById('loading-status');
        if (status) {
            status.textContent = text;
        }
    },

    /**
     * Hide loading overlay
     * @param {number} delay - Delay before hiding (ms)
     */
    hideLoadingOverlay(delay = 500) {
        setTimeout(() => {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            }
        }, delay);
    },

    /**
     * Create image upload component
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createImageUpload(options = {}) {
        const {
            id = 'image-upload',
            accept = 'image/*',
            multiple = false,
            label = 'Upload Image',
            onChange = null
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';

        const input = document.createElement('input');
        input.type = 'file';
        input.id = id;
        input.accept = accept;
        input.multiple = multiple;

        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.className = 'file-input-label';
        labelEl.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            ${label}
        `;

        if (onChange) {
            input.addEventListener('change', (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    onChange(multiple ? files : files[0]);
                }
            });
        }

        wrapper.appendChild(input);
        wrapper.appendChild(labelEl);
        return wrapper;
    },

    /**
     * Create range slider with value display
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createRangeSlider(options = {}) {
        const {
            id = 'slider',
            label = 'Value',
            min = 0,
            max = 100,
            value = 50,
            step = 1,
            onChange = null,
            formatValue = (v) => v
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';

        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;

        const rangeGroup = document.createElement('div');
        rangeGroup.className = 'range-group';

        const input = document.createElement('input');
        input.type = 'range';
        input.id = id;
        input.min = min;
        input.max = max;
        input.value = value;
        input.step = step;

        const valueDisplay = document.createElement('span');
        valueDisplay.className = 'range-value';
        valueDisplay.textContent = formatValue(value);

        input.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            valueDisplay.textContent = formatValue(val);
            if (onChange) onChange(val);
        });

        rangeGroup.appendChild(input);
        rangeGroup.appendChild(valueDisplay);
        wrapper.appendChild(labelEl);
        wrapper.appendChild(rangeGroup);
        return wrapper;
    },

    /**
     * Create select dropdown
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createSelect(options = {}) {
        const {
            id = 'select',
            label = 'Select',
            choices = [],
            value = null,
            onChange = null
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';

        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;

        const select = document.createElement('select');
        select.id = id;

        choices.forEach(choice => {
            const option = document.createElement('option');
            if (typeof choice === 'object') {
                option.value = choice.value;
                option.textContent = choice.label;
            } else {
                option.value = choice;
                option.textContent = choice;
            }
            if (value !== null && option.value === value) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        if (onChange) {
            select.addEventListener('change', (e) => onChange(e.target.value));
        }

        wrapper.appendChild(labelEl);
        wrapper.appendChild(select);
        return wrapper;
    },

    /**
     * Create button
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createButton(options = {}) {
        const {
            id = null,
            text = 'Button',
            className = 'btn btn-primary',
            icon = null,
            onClick = null,
            disabled = false
        } = options;

        const button = document.createElement('button');
        button.className = className;
        if (id) button.id = id;
        button.disabled = disabled;

        if (icon) {
            button.innerHTML = `${icon} ${text}`;
        } else {
            button.textContent = text;
        }

        if (onClick) {
            button.addEventListener('click', onClick);
        }

        return button;
    },

    /**
     * Create canvas container with label
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createCanvasContainer(options = {}) {
        const {
            id = 'canvas',
            label = 'Output',
            width = 640,
            height = 480
        } = options;

        const container = document.createElement('div');
        container.className = 'canvas-container';

        const canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;

        const labelEl = document.createElement('span');
        labelEl.className = 'canvas-label';
        labelEl.textContent = label;

        container.appendChild(canvas);
        container.appendChild(labelEl);
        return container;
    },

    /**
     * Create metrics display
     * @param {Array} metrics - Array of {label, value, id} objects
     * @returns {HTMLElement}
     */
    createMetricsDisplay(metrics = []) {
        const container = document.createElement('div');
        container.className = 'metrics';

        metrics.forEach(({ label, value = '-', id }) => {
            const metric = document.createElement('div');
            metric.className = 'metric';
            metric.innerHTML = `
                <span class="metric-label">${label}</span>
                <span class="metric-value" id="${id}">${value}</span>
            `;
            container.appendChild(metric);
        });

        return container;
    },

    /**
     * Update metric value
     * @param {string} id - Metric ID
     * @param {string|number} value - New value
     */
    updateMetric(id, value) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value;
        }
    },

    /**
     * Create alert box
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createAlert(options = {}) {
        const {
            type = 'info',
            message = '',
            dismissible = false
        } = options;

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = message;

        if (dismissible) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'btn-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = 'float: right; background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem;';
            closeBtn.onclick = () => alert.remove();
            alert.prepend(closeBtn);
        }

        return alert;
    },

    /**
     * Show toast notification
     * @param {Object} options
     */
    showToast(options = {}) {
        const {
            message = '',
            type = 'info',
            duration = 3000
        } = options;

        // Create toast container if not exists
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1001;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `alert alert-${type}`;
        toast.style.cssText = `
            animation: slideIn 0.3s ease;
            min-width: 250px;
            box-shadow: var(--shadow-lg);
        `;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    /**
     * Create tabs component
     * @param {Array} tabs - Array of {id, label, content} objects
     * @returns {HTMLElement}
     */
    createTabs(tabs = []) {
        const container = document.createElement('div');
        container.className = 'tabs-container';

        const tabsNav = document.createElement('div');
        tabsNav.className = 'tabs';

        const tabsContent = document.createElement('div');
        tabsContent.className = 'tabs-content-container';

        tabs.forEach((tab, index) => {
            // Create tab button
            const tabBtn = document.createElement('button');
            tabBtn.className = `tab ${index === 0 ? 'active' : ''}`;
            tabBtn.textContent = tab.label;
            tabBtn.dataset.tabId = tab.id;

            // Create tab content
            const content = document.createElement('div');
            content.className = `tab-content ${index === 0 ? 'active' : ''}`;
            content.id = `tab-${tab.id}`;
            if (typeof tab.content === 'string') {
                content.innerHTML = tab.content;
            } else if (tab.content instanceof HTMLElement) {
                content.appendChild(tab.content);
            }

            tabBtn.addEventListener('click', () => {
                // Deactivate all
                container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                // Activate clicked
                tabBtn.classList.add('active');
                content.classList.add('active');
            });

            tabsNav.appendChild(tabBtn);
            tabsContent.appendChild(content);
        });

        container.appendChild(tabsNav);
        container.appendChild(tabsContent);
        return container;
    },

    /**
     * Create toggle switch
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createToggle(options = {}) {
        const {
            id = 'toggle',
            label = 'Toggle',
            checked = false,
            onChange = null
        } = options;

        const wrapper = document.createElement('div');
        wrapper.className = 'form-group';
        wrapper.style.cssText = 'flex-direction: row; align-items: center; gap: 10px;';

        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.textContent = label;
        labelEl.style.marginBottom = '0';

        const toggle = document.createElement('div');
        toggle.className = `toggle ${checked ? 'active' : ''}`;
        toggle.id = id;
        toggle.role = 'switch';
        toggle.setAttribute('aria-checked', checked);

        toggle.addEventListener('click', () => {
            const isActive = toggle.classList.toggle('active');
            toggle.setAttribute('aria-checked', isActive);
            if (onChange) onChange(isActive);
        });

        wrapper.appendChild(labelEl);
        wrapper.appendChild(toggle);
        return wrapper;
    },

    /**
     * Create webcam controls
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createWebcamControls(options = {}) {
        const {
            onStart = null,
            onStop = null,
            onCapture = null
        } = options;

        const container = document.createElement('div');
        container.className = 'flex gap-md items-center';

        const startBtn = this.createButton({
            id: 'webcam-start',
            text: 'Start Camera',
            className: 'btn btn-success',
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
            onClick: () => {
                if (onStart) onStart();
                startBtn.classList.add('hidden');
                stopBtn.classList.remove('hidden');
                if (captureBtn) captureBtn.disabled = false;
            }
        });

        const stopBtn = this.createButton({
            id: 'webcam-stop',
            text: 'Stop Camera',
            className: 'btn btn-danger hidden',
            icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12"/></svg>',
            onClick: () => {
                if (onStop) onStop();
                stopBtn.classList.add('hidden');
                startBtn.classList.remove('hidden');
                if (captureBtn) captureBtn.disabled = true;
            }
        });

        container.appendChild(startBtn);
        container.appendChild(stopBtn);

        if (onCapture) {
            const captureBtn = this.createButton({
                id: 'webcam-capture',
                text: 'Capture',
                className: 'btn btn-secondary',
                disabled: true,
                icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>',
                onClick: onCapture
            });
            container.appendChild(captureBtn);
        }

        return container;
    },

    /**
     * Create input source selector (upload + webcam)
     * @param {Object} options
     * @returns {HTMLElement}
     */
    createInputSourceSelector(options = {}) {
        const {
            id = 'input-source',
            onImageLoad = null,
            onWebcamFrame = null,
            onWebcamStart = null,
            onWebcamStop = null,
            showCapture = true,
            videoWidth = 640,
            videoHeight = 480
        } = options;

        const container = document.createElement('div');
        container.className = 'input-source-selector';
        container.id = id;

        // Source tabs
        const tabs = document.createElement('div');
        tabs.className = 'flex gap-sm mb-md';

        const uploadTab = document.createElement('button');
        uploadTab.className = 'btn btn-primary';
        uploadTab.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload
        `;

        const webcamTab = document.createElement('button');
        webcamTab.className = 'btn btn-secondary';
        webcamTab.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 7l-7 5 7 5V7z"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
            Webcam
        `;

        tabs.appendChild(uploadTab);
        tabs.appendChild(webcamTab);
        container.appendChild(tabs);

        // Content areas
        const uploadContent = document.createElement('div');
        uploadContent.className = 'input-source-content';
        uploadContent.id = `${id}-upload-content`;

        const webcamContent = document.createElement('div');
        webcamContent.className = 'input-source-content hidden';
        webcamContent.id = `${id}-webcam-content`;

        // Upload controls
        const uploadControls = document.createElement('div');
        uploadControls.className = 'flex gap-md items-center flex-wrap';

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = `${id}-file`;
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        const fileLabel = document.createElement('label');
        fileLabel.htmlFor = `${id}-file`;
        fileLabel.className = 'file-input-label';
        fileLabel.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Choose Image
        `;

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0 && onImageLoad) {
                onImageLoad(e.target.files[0]);
            }
        });

        const sampleBtn = this.createButton({
            text: 'Use Sample',
            className: 'btn btn-secondary',
            onClick: () => {
                if (onImageLoad) {
                    onImageLoad('../images/lena.png');
                }
            }
        });

        uploadControls.appendChild(fileInput);
        uploadControls.appendChild(fileLabel);
        uploadControls.appendChild(sampleBtn);
        uploadContent.appendChild(uploadControls);

        // Webcam controls
        const webcamControls = document.createElement('div');
        webcamControls.className = 'flex gap-md items-center flex-wrap';

        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container hidden';
        videoContainer.style.maxWidth = '320px';
        videoContainer.style.marginTop = 'var(--spacing-md)';

        const video = document.createElement('video');
        video.id = `${id}-video`;
        video.setAttribute('playsinline', '');
        video.muted = true;
        videoContainer.appendChild(video);

        const fpsDisplay = document.createElement('span');
        fpsDisplay.className = 'canvas-label';
        fpsDisplay.id = `${id}-fps`;
        fpsDisplay.textContent = 'FPS: --';
        videoContainer.appendChild(fpsDisplay);

        let isWebcamActive = false;

        const startBtn = this.createButton({
            id: `${id}-start`,
            text: 'Start Camera',
            className: 'btn btn-success',
            onClick: async () => {
                try {
                    await WebcamManager.init({
                        width: videoWidth,
                        height: videoHeight,
                        videoElement: video
                    });

                    videoContainer.classList.remove('hidden');
                    startBtn.classList.add('hidden');
                    stopBtn.classList.remove('hidden');
                    if (captureBtn) captureBtn.disabled = false;
                    isWebcamActive = true;

                    if (onWebcamStart) onWebcamStart();

                    if (onWebcamFrame) {
                        WebcamManager.startProcessing((mat, fps) => {
                            fpsDisplay.textContent = `FPS: ${fps}`;
                            onWebcamFrame(mat, fps);
                        });
                    }
                } catch (error) {
                    this.showToast({
                        message: 'Failed to start webcam: ' + error.message,
                        type: 'error'
                    });
                }
            }
        });

        const stopBtn = this.createButton({
            id: `${id}-stop`,
            text: 'Stop Camera',
            className: 'btn btn-danger hidden',
            onClick: () => {
                WebcamManager.stop();
                videoContainer.classList.add('hidden');
                stopBtn.classList.add('hidden');
                startBtn.classList.remove('hidden');
                if (captureBtn) captureBtn.disabled = true;
                isWebcamActive = false;

                if (onWebcamStop) onWebcamStop();
            }
        });

        webcamControls.appendChild(startBtn);
        webcamControls.appendChild(stopBtn);

        let captureBtn = null;
        if (showCapture) {
            captureBtn = this.createButton({
                id: `${id}-capture`,
                text: 'Capture Frame',
                className: 'btn btn-secondary',
                disabled: true,
                onClick: () => {
                    if (isWebcamActive && onImageLoad) {
                        const mat = WebcamManager.captureFrame();
                        if (mat) {
                            onImageLoad(mat);
                        }
                    }
                }
            });
            webcamControls.appendChild(captureBtn);
        }

        webcamContent.appendChild(webcamControls);
        webcamContent.appendChild(videoContainer);

        container.appendChild(uploadContent);
        container.appendChild(webcamContent);

        // Tab switching
        uploadTab.addEventListener('click', () => {
            uploadTab.className = 'btn btn-primary';
            webcamTab.className = 'btn btn-secondary';
            uploadContent.classList.remove('hidden');
            webcamContent.classList.add('hidden');
        });

        webcamTab.addEventListener('click', () => {
            webcamTab.className = 'btn btn-primary';
            uploadTab.className = 'btn btn-secondary';
            webcamContent.classList.remove('hidden');
            uploadContent.classList.add('hidden');
        });

        // Cleanup function
        container.cleanup = () => {
            if (isWebcamActive) {
                WebcamManager.stop();
            }
        };

        return container;
    },

    /**
     * Initialize page with common structure
     * @param {Object} options
     */
    initPage(options = {}) {
        const {
            title = 'Demo',
            description = '',
            buildType = 'full'
        } = options;

        // Add loading overlay
        document.body.appendChild(this.createLoadingOverlay());

        // Load OpenCV
        return OpenCVLoader.load({
            buildType,
            onProgress: this.updateLoadingProgress,
            statusElement: document.getElementById('loading-status')
        }).then(() => {
            this.hideLoadingOverlay();
            return cv;
        }).catch(error => {
            this.updateLoadingStatus(`Error: ${error.message}`);
            throw error;
        });
    }
};

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for use as module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIComponents;
} else {
    window.UIComponents = UIComponents;
}
