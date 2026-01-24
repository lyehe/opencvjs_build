/**
 * Basic OpenCV.js Operations
 *
 * Demonstrates:
 * - Loading OpenCV.js in Node.js
 * - Creating and manipulating Mat objects
 * - Drawing shapes
 * - Basic image information
 *
 * Run: node examples/node/basic.js
 */

(async () => {
    console.log('Loading OpenCV.js...');
    const cv = await require('../../dist/full/opencv.js');
    console.log('OpenCV.js loaded successfully!\n');

    // ============================================
    // Example 1: Create a Mat and fill with color
    // ============================================
    console.log('=== Example 1: Creating Matrices ===');

    // Create a 100x100 BGR image
    const mat = new cv.Mat(100, 100, cv.CV_8UC3);
    console.log(`Created Mat: ${mat.rows}x${mat.cols}`);
    console.log(`Type: ${mat.type()}, Channels: ${mat.channels()}`);

    // Fill with blue (BGR format)
    mat.setTo(new cv.Scalar(255, 0, 0));
    console.log('Filled with blue color (BGR: 255, 0, 0)');

    // ============================================
    // Example 2: Create Mat from array data
    // ============================================
    console.log('\n=== Example 2: Mat from Array ===');

    // Create a 3x3 grayscale image from array
    const data = new Uint8Array([
        0, 128, 255,
        64, 192, 32,
        255, 0, 128
    ]);
    const smallMat = cv.matFromArray(3, 3, cv.CV_8UC1, data);
    console.log(`Created 3x3 grayscale Mat from array`);
    console.log(`Value at (1,1): ${smallMat.ucharAt(1, 1)}`);

    // ============================================
    // Example 3: Drawing shapes
    // ============================================
    console.log('\n=== Example 3: Drawing Shapes ===');

    // Draw rectangle
    cv.rectangle(
        mat,
        new cv.Point(10, 10),
        new cv.Point(90, 90),
        new cv.Scalar(0, 255, 0), // Green
        2 // Line thickness
    );
    console.log('Drew green rectangle');

    // Draw circle
    cv.circle(
        mat,
        new cv.Point(50, 50),
        25,
        new cv.Scalar(0, 0, 255), // Red
        -1 // Filled
    );
    console.log('Drew filled red circle');

    // Draw line
    cv.line(
        mat,
        new cv.Point(0, 0),
        new cv.Point(99, 99),
        new cv.Scalar(255, 255, 255), // White
        1
    );
    console.log('Drew white diagonal line');

    // ============================================
    // Example 4: Mat operations
    // ============================================
    console.log('\n=== Example 4: Mat Operations ===');

    // Clone a Mat
    const cloned = mat.clone();
    console.log('Cloned Mat');

    // Create ROI (Region of Interest)
    const roi = mat.roi(new cv.Rect(25, 25, 50, 50));
    console.log(`ROI size: ${roi.rows}x${roi.cols}`);

    // Get Mat info
    console.log(`\nMat info:`);
    console.log(`  - Size: ${mat.size().width}x${mat.size().height}`);
    console.log(`  - Total elements: ${mat.total()}`);
    console.log(`  - Is continuous: ${mat.isContinuous()}`);
    console.log(`  - Empty: ${mat.empty()}`);

    // ============================================
    // Example 5: Scalar and Point operations
    // ============================================
    console.log('\n=== Example 5: Scalars and Points ===');

    const scalar = new cv.Scalar(100, 150, 200, 255);
    console.log(`Scalar values: [${scalar[0]}, ${scalar[1]}, ${scalar[2]}, ${scalar[3]}]`);

    const point = new cv.Point(50, 75);
    console.log(`Point: (${point.x}, ${point.y})`);

    const size = new cv.Size(640, 480);
    console.log(`Size: ${size.width}x${size.height}`);

    // ============================================
    // Clean up - IMPORTANT!
    // ============================================
    console.log('\n=== Cleaning up ===');
    mat.delete();
    smallMat.delete();
    cloned.delete();
    roi.delete();
    console.log('All Mat objects deleted');

    console.log('\n✓ Basic example completed successfully!');
})();
