/**
 * ArUco Marker Detection with OpenCV.js
 *
 * Demonstrates:
 * - Creating ArUco dictionaries
 * - Generating ArUco markers
 * - Detecting markers in images
 *
 * Run: node examples/node/aruco-detection.js
 */

(async () => {
    console.log('Loading OpenCV.js...');
    const cv = await require('../../dist/opencv.js');
    console.log('OpenCV.js loaded successfully!\n');

    // ============================================
    // Example 1: Create ArUco Dictionary
    // ============================================
    console.log('=== Example 1: ArUco Dictionary ===');

    // Available dictionaries:
    // - DICT_4X4_50, DICT_4X4_100, DICT_4X4_250, DICT_4X4_1000
    // - DICT_5X5_50, DICT_5X5_100, DICT_5X5_250, DICT_5X5_1000
    // - DICT_6X6_50, DICT_6X6_100, DICT_6X6_250, DICT_6X6_1000
    // - DICT_7X7_50, DICT_7X7_100, DICT_7X7_250, DICT_7X7_1000
    // - DICT_ARUCO_ORIGINAL

    const dictionary = cv.getPredefinedDictionary(cv.DICT_6X6_250);
    console.log('Created DICT_6X6_250 dictionary');

    // ============================================
    // Example 2: Generate ArUco Markers
    // ============================================
    console.log('\n=== Example 2: Generate ArUco Markers ===');

    const markerSize = 100; // pixels
    const markersToGenerate = [0, 1, 2, 3];
    const generatedMarkers = [];

    for (const id of markersToGenerate) {
        const marker = new cv.Mat();
        cv.generateImageMarker(dictionary, id, markerSize, marker, 1);
        generatedMarkers.push(marker);
        console.log(`Generated marker ID ${id}: ${marker.rows}x${marker.cols}`);
    }

    // ============================================
    // Example 3: Create Test Image with Markers
    // ============================================
    console.log('\n=== Example 3: Create Test Image ===');

    // Create a white canvas
    const testImage = new cv.Mat(400, 400, cv.CV_8UC1);
    testImage.setTo(new cv.Scalar(255));

    // Place markers at corners
    const positions = [
        { x: 50, y: 50 },
        { x: 250, y: 50 },
        { x: 50, y: 250 },
        { x: 250, y: 250 }
    ];

    for (let i = 0; i < generatedMarkers.length; i++) {
        const marker = generatedMarkers[i];
        const pos = positions[i];

        // Copy marker to test image at position
        const roi = testImage.roi(new cv.Rect(pos.x, pos.y, marker.cols, marker.rows));
        marker.copyTo(roi);
        roi.delete();
    }
    console.log(`Created test image with ${generatedMarkers.length} markers`);

    // ============================================
    // Example 4: Detect ArUco Markers
    // ============================================
    console.log('\n=== Example 4: Detect Markers ===');

    // Create detector with parameters
    // aruco_RefineParameters(minRepDistance, errorCorrectionRate, checkAllOrders)
    const detectorParams = new cv.aruco_DetectorParameters();
    const refineParams = new cv.aruco_RefineParameters(10.0, 3.0, true);
    const detector = new cv.aruco_ArucoDetector(dictionary, detectorParams, refineParams);

    const corners = new cv.MatVector();
    const ids = new cv.Mat();
    const rejected = new cv.MatVector();

    // Detect markers
    detector.detectMarkers(testImage, corners, ids, rejected);

    console.log(`Detected ${ids.rows} markers`);
    console.log(`Rejected ${rejected.size()} candidates`);

    if (ids.rows > 0) {
        console.log('\nDetected marker details:');
        for (let i = 0; i < ids.rows; i++) {
            const markerId = ids.intAt(i, 0);
            const markerCorners = corners.get(i);

            console.log(`  Marker ID ${markerId}:`);
            for (let j = 0; j < 4; j++) {
                const x = markerCorners.floatAt(0, j * 2);
                const y = markerCorners.floatAt(0, j * 2 + 1);
                console.log(`    Corner ${j}: (${x.toFixed(1)}, ${y.toFixed(1)})`);
            }
        }
    }

    // ============================================
    // Example 5: Draw Detected Markers
    // ============================================
    console.log('\n=== Example 5: Draw Detected Markers ===');

    // Convert to color for drawing
    const colorImage = new cv.Mat();
    cv.cvtColor(testImage, colorImage, cv.COLOR_GRAY2BGR);

    if (ids.rows > 0) {
        cv.drawDetectedMarkers(colorImage, corners, ids);
        console.log('Drew detected markers on image');
    }

    // ============================================
    // Example 6: Detector Parameters
    // ============================================
    console.log('\n=== Example 6: Detector Parameters ===');

    // Access and modify detector parameters
    console.log('Default detector parameters:');
    console.log(`  adaptiveThreshWinSizeMin: ${detectorParams.adaptiveThreshWinSizeMin}`);
    console.log(`  adaptiveThreshWinSizeMax: ${detectorParams.adaptiveThreshWinSizeMax}`);
    console.log(`  adaptiveThreshWinSizeStep: ${detectorParams.adaptiveThreshWinSizeStep}`);
    console.log(`  minMarkerPerimeterRate: ${detectorParams.minMarkerPerimeterRate}`);
    console.log(`  maxMarkerPerimeterRate: ${detectorParams.maxMarkerPerimeterRate}`);
    console.log(`  polygonalApproxAccuracyRate: ${detectorParams.polygonalApproxAccuracyRate}`);
    console.log(`  cornerRefinementMethod: ${detectorParams.cornerRefinementMethod}`);

    // ============================================
    // Example 7: Different Dictionary Sizes
    // ============================================
    console.log('\n=== Example 7: Dictionary Comparison ===');

    const dictionaries = [
        { name: 'DICT_4X4_50', id: cv.DICT_4X4_50 },
        { name: 'DICT_5X5_100', id: cv.DICT_5X5_100 },
        { name: 'DICT_6X6_250', id: cv.DICT_6X6_250 },
        { name: 'DICT_7X7_1000', id: cv.DICT_7X7_1000 },
    ];

    console.log('Available dictionary types:');
    for (const dict of dictionaries) {
        console.log(`  ${dict.name}: ${dict.name.split('_')[1]} grid, ${dict.name.split('_')[2]} markers`);
    }

    // ============================================
    // Example 8: CharucoBoard Creation
    // ============================================
    console.log('\n=== Example 8: CharucoBoard Creation ===');

    try {
        // CharucoBoard(size, squareLength, markerLength, dictionary, ids)
        // ids can be empty Mat to auto-generate marker IDs
        const ids = new cv.Mat();
        const board = new cv.aruco_CharucoBoard(
            new cv.Size(5, 7),  // 5x7 squares
            0.04,               // square length (4cm)
            0.02,               // marker length (2cm)
            dictionary,
            ids                 // marker IDs (empty = auto-generate)
        );
        console.log('Created CharucoBoard: 5x7 squares');

        // Generate board image
        const boardImage = new cv.Mat();
        board.generateImage(new cv.Size(600, 800), boardImage, 10, 1);
        console.log(`Generated board image: ${boardImage.rows}x${boardImage.cols}`);

        board.delete();
        boardImage.delete();
        ids.delete();
    } catch (e) {
        console.log('CharucoBoard error:', e.message);
    }

    // ============================================
    // Clean up
    // ============================================
    console.log('\n=== Cleaning up ===');

    generatedMarkers.forEach(m => m.delete());
    testImage.delete();
    colorImage.delete();
    dictionary.delete();
    detectorParams.delete();
    refineParams.delete();
    detector.delete();
    corners.delete();
    ids.delete();
    rejected.delete();

    console.log('All resources cleaned up');

    console.log('\n✓ ArUco detection example completed successfully!');
})();
