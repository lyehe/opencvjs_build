/**
 * Image Processing with OpenCV.js
 *
 * Demonstrates:
 * - Color space conversions
 * - Blur operations (Gaussian, Median, Bilateral)
 * - Edge detection (Canny, Sobel, Laplacian)
 * - Thresholding
 * - Morphological operations
 *
 * Run: node examples/node/image-processing.js
 */

(async () => {
    console.log('Loading OpenCV.js...');
    const cv = await require('../../dist/full/opencv.js');
    console.log('OpenCV.js loaded successfully!\n');

    // Create a test image with various features
    const src = new cv.Mat(200, 200, cv.CV_8UC3);
    src.setTo(new cv.Scalar(255, 255, 255)); // White background

    // Draw some shapes for processing
    cv.rectangle(src, new cv.Point(30, 30), new cv.Point(170, 170), new cv.Scalar(0, 0, 0), 2);
    cv.circle(src, new cv.Point(100, 100), 50, new cv.Scalar(128, 128, 128), -1);
    cv.line(src, new cv.Point(30, 30), new cv.Point(170, 170), new cv.Scalar(0, 0, 255), 3);
    console.log('Created test image with shapes\n');

    // ============================================
    // Example 1: Color Space Conversions
    // ============================================
    console.log('=== Example 1: Color Space Conversions ===');

    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY);
    console.log(`BGR to Grayscale: ${gray.channels()} channel(s)`);

    const hsv = new cv.Mat();
    cv.cvtColor(src, hsv, cv.COLOR_BGR2HSV);
    console.log(`BGR to HSV: ${hsv.channels()} channel(s)`);

    const lab = new cv.Mat();
    cv.cvtColor(src, lab, cv.COLOR_BGR2Lab);
    console.log(`BGR to Lab: ${lab.channels()} channel(s)`);

    // ============================================
    // Example 2: Blur Operations
    // ============================================
    console.log('\n=== Example 2: Blur Operations ===');

    // Gaussian Blur
    const gaussianBlur = new cv.Mat();
    cv.GaussianBlur(src, gaussianBlur, new cv.Size(5, 5), 0);
    console.log('Applied Gaussian Blur (5x5 kernel)');

    // Median Blur
    const medianBlur = new cv.Mat();
    cv.medianBlur(src, medianBlur, 5);
    console.log('Applied Median Blur (kernel size 5)');

    // Bilateral Filter
    const bilateral = new cv.Mat();
    cv.bilateralFilter(src, bilateral, 9, 75, 75);
    console.log('Applied Bilateral Filter (d=9, sigmaColor=75, sigmaSpace=75)');

    // Box Filter
    const boxFilter = new cv.Mat();
    cv.blur(src, boxFilter, new cv.Size(5, 5));
    console.log('Applied Box Filter (5x5)');

    // ============================================
    // Example 3: Edge Detection
    // ============================================
    console.log('\n=== Example 3: Edge Detection ===');

    // Canny Edge Detection
    const canny = new cv.Mat();
    cv.Canny(gray, canny, 50, 150);
    console.log('Applied Canny Edge Detection (threshold1=50, threshold2=150)');

    // Sobel Edge Detection
    const sobelX = new cv.Mat();
    const sobelY = new cv.Mat();
    cv.Sobel(gray, sobelX, cv.CV_64F, 1, 0, 3);
    cv.Sobel(gray, sobelY, cv.CV_64F, 0, 1, 3);
    console.log('Applied Sobel Edge Detection (X and Y gradients)');

    // Laplacian Edge Detection
    const laplacian = new cv.Mat();
    cv.Laplacian(gray, laplacian, cv.CV_64F);
    console.log('Applied Laplacian Edge Detection');

    // ============================================
    // Example 4: Thresholding
    // ============================================
    console.log('\n=== Example 4: Thresholding ===');

    // Binary Threshold
    const binary = new cv.Mat();
    cv.threshold(gray, binary, 127, 255, cv.THRESH_BINARY);
    console.log('Applied Binary Threshold (thresh=127)');

    // Otsu's Threshold
    const otsu = new cv.Mat();
    const otsuThresh = cv.threshold(gray, otsu, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
    console.log(`Applied Otsu's Threshold (auto thresh=${otsuThresh.toFixed(1)})`);

    // Adaptive Threshold
    const adaptive = new cv.Mat();
    cv.adaptiveThreshold(gray, adaptive, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 11, 2);
    console.log('Applied Adaptive Threshold (Gaussian, blockSize=11)');

    // ============================================
    // Example 5: Morphological Operations
    // ============================================
    console.log('\n=== Example 5: Morphological Operations ===');

    // Create a structuring element
    const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(5, 5));
    console.log('Created 5x5 rectangular structuring element');

    // Erosion
    const eroded = new cv.Mat();
    cv.erode(binary, eroded, kernel);
    console.log('Applied Erosion');

    // Dilation
    const dilated = new cv.Mat();
    cv.dilate(binary, dilated, kernel);
    console.log('Applied Dilation');

    // Opening (erosion followed by dilation)
    const opened = new cv.Mat();
    cv.morphologyEx(binary, opened, cv.MORPH_OPEN, kernel);
    console.log('Applied Opening');

    // Closing (dilation followed by erosion)
    const closed = new cv.Mat();
    cv.morphologyEx(binary, closed, cv.MORPH_CLOSE, kernel);
    console.log('Applied Closing');

    // Gradient
    const gradient = new cv.Mat();
    cv.morphologyEx(binary, gradient, cv.MORPH_GRADIENT, kernel);
    console.log('Applied Morphological Gradient');

    // ============================================
    // Example 6: Histogram Operations
    // ============================================
    console.log('\n=== Example 6: Histogram Equalization ===');

    const equalized = new cv.Mat();
    cv.equalizeHist(gray, equalized);
    console.log('Applied Histogram Equalization');

    // ============================================
    // Clean up
    // ============================================
    console.log('\n=== Cleaning up ===');
    const mats = [
        src, gray, hsv, lab,
        gaussianBlur, medianBlur, bilateral, boxFilter,
        canny, sobelX, sobelY, laplacian,
        binary, otsu, adaptive,
        kernel, eroded, dilated, opened, closed, gradient,
        equalized
    ];
    mats.forEach(mat => mat.delete());
    console.log(`Deleted ${mats.length} Mat objects`);

    console.log('\n✓ Image processing example completed successfully!');
})();
