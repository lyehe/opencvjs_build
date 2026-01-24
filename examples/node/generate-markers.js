/**
 * Generate ArUco and ChArUco Marker Images
 *
 * Creates printable marker images for testing detection.
 *
 * Run: node examples/node/generate-markers.js
 *
 * Output:
 *   examples/images/aruco_marker_0.png
 *   examples/images/aruco_marker_1.png
 *   examples/images/aruco_marker_2.png
 *   examples/images/aruco_marker_3.png
 *   examples/images/aruco_board.png
 *   examples/images/charuco_board.png
 *   examples/images/test_scene.png
 */

const fs = require('fs');
const path = require('path');

(async () => {
    console.log('Loading OpenCV.js...');
    const cv = await require('../../dist/full/opencv.js');
    console.log('OpenCV.js loaded successfully!\n');

    // Create output directory
    const outputDir = path.join(__dirname, '..', 'images');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    console.log(`Output directory: ${outputDir}\n`);

    // Helper function to save Mat as PNG
    function saveImage(mat, filename) {
        const filePath = path.join(outputDir, filename);

        // Convert to RGBA if needed for proper PNG output
        let rgba = new cv.Mat();
        if (mat.channels() === 1) {
            cv.cvtColor(mat, rgba, cv.COLOR_GRAY2RGBA);
        } else if (mat.channels() === 3) {
            cv.cvtColor(mat, rgba, cv.COLOR_BGR2RGBA);
        } else {
            mat.copyTo(rgba);
        }

        // Get image data
        const data = new Uint8ClampedArray(rgba.data);
        const width = rgba.cols;
        const height = rgba.rows;

        // Create a simple PNG manually (uncompressed)
        // For simplicity, we'll save as PPM format which is easier
        // Then note that users should convert to PNG if needed
        const ppmPath = filePath.replace('.png', '.ppm');

        // PPM P6 format (binary RGB)
        let rgbMat = new cv.Mat();
        if (mat.channels() === 1) {
            cv.cvtColor(mat, rgbMat, cv.COLOR_GRAY2RGB);
        } else if (mat.channels() === 4) {
            cv.cvtColor(mat, rgbMat, cv.COLOR_RGBA2RGB);
        } else {
            mat.copyTo(rgbMat);
        }

        const header = `P6\n${width} ${height}\n255\n`;
        const rgbData = Buffer.from(rgbMat.data);
        const ppmData = Buffer.concat([Buffer.from(header), rgbData]);

        fs.writeFileSync(ppmPath, ppmData);
        console.log(`  Saved: ${ppmPath}`);

        rgba.delete();
        rgbMat.delete();

        return ppmPath;
    }

    // ============================================
    // 1. Generate Individual ArUco Markers
    // ============================================
    console.log('=== Generating ArUco Markers ===');

    const dictionary = cv.getPredefinedDictionary(cv.DICT_6X6_250);
    const markerSize = 200; // pixels
    const markerIds = [0, 1, 2, 3];

    for (const id of markerIds) {
        const marker = new cv.Mat();
        cv.generateImageMarker(dictionary, id, markerSize, marker, 1);

        // Add white border for printing
        const bordered = new cv.Mat();
        const borderSize = 20;
        cv.copyMakeBorder(
            marker, bordered,
            borderSize, borderSize, borderSize, borderSize,
            cv.BORDER_CONSTANT,
            new cv.Scalar(255)
        );

        saveImage(bordered, `aruco_marker_${id}.ppm`);
        console.log(`  Generated ArUco marker ID ${id}`);

        marker.delete();
        bordered.delete();
    }

    // ============================================
    // 2. Generate ArUco Grid Board
    // ============================================
    console.log('\n=== Generating ArUco Board ===');

    // Create a 3x3 grid of markers
    const boardWidth = 700;
    const boardHeight = 700;
    const board = new cv.Mat(boardHeight, boardWidth, cv.CV_8UC1);
    board.setTo(new cv.Scalar(255)); // White background

    const gridMarkerSize = 150;
    const gridSpacing = 50;
    const startX = 75;
    const startY = 75;

    let markerId = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const marker = new cv.Mat();
            cv.generateImageMarker(dictionary, markerId, gridMarkerSize, marker, 1);

            const x = startX + col * (gridMarkerSize + gridSpacing);
            const y = startY + row * (gridMarkerSize + gridSpacing);

            // Copy marker to board
            const roi = board.roi(new cv.Rect(x, y, gridMarkerSize, gridMarkerSize));
            marker.copyTo(roi);

            marker.delete();
            markerId++;
        }
    }

    // Add title
    cv.putText(board, 'ArUco Board (DICT_6X6_250)', new cv.Point(50, boardHeight - 20),
        cv.FONT_HERSHEY_SIMPLEX, 0.7, new cv.Scalar(0), 2);

    saveImage(board, 'aruco_board.ppm');
    console.log('  Generated 3x3 ArUco board with markers 0-8');
    board.delete();

    // ============================================
    // 3. Generate ChArUco Board
    // ============================================
    console.log('\n=== Generating ChArUco Board ===');

    // ChArUco board parameters
    const squaresX = 5;
    const squaresY = 7;
    const squareLength = 80;
    const markerLength = 60;

    // Create ChArUco board - OpenCV 4.x API requires Size, squareLength, markerLength, dictionary, ids
    let charucoBoard;
    let charucoBoardImage = new cv.Mat();

    try {
        // Try newer API first (OpenCV 4.7+)
        charucoBoard = new cv.aruco_CharucoBoard(
            new cv.Size(squaresX, squaresY),
            squareLength,
            markerLength,
            dictionary,
            new cv.Mat()  // empty ids = auto-generate
        );

        const boardImgSize = new cv.Size(squaresX * squareLength + 40, squaresY * squareLength + 60);
        charucoBoard.generateImage(boardImgSize, charucoBoardImage, 10, 1);

        // Add title
        cv.putText(charucoBoardImage, 'ChArUco Board 5x7', new cv.Point(20, boardImgSize.height - 15),
            cv.FONT_HERSHEY_SIMPLEX, 0.6, new cv.Scalar(0), 2);

        saveImage(charucoBoardImage, 'charuco_board.ppm');
        console.log(`  Generated ${squaresX}x${squaresY} ChArUco board`);

        charucoBoard.delete();
    } catch (e) {
        console.log(`  ChArUco generation not available: ${e.message}`);
        console.log('  Creating manual checkerboard with ArUco markers instead...');

        // Create a manual ChArUco-like board
        const boardW = squaresX * squareLength + 40;
        const boardH = squaresY * squareLength + 60;
        charucoBoardImage = new cv.Mat(boardH, boardW, cv.CV_8UC1);
        charucoBoardImage.setTo(new cv.Scalar(255));

        // Draw checkerboard pattern
        let markerIdx = 0;
        for (let row = 0; row < squaresY; row++) {
            for (let col = 0; col < squaresX; col++) {
                const x = 20 + col * squareLength;
                const y = 20 + row * squareLength;

                if ((row + col) % 2 === 0) {
                    // Black square
                    cv.rectangle(charucoBoardImage,
                        new cv.Point(x, y),
                        new cv.Point(x + squareLength, y + squareLength),
                        new cv.Scalar(0), -1);
                } else {
                    // White square with ArUco marker
                    const marker = new cv.Mat();
                    const mSize = markerLength;
                    cv.generateImageMarker(dictionary, markerIdx % 250, mSize, marker, 1);

                    const mx = x + (squareLength - mSize) / 2;
                    const my = y + (squareLength - mSize) / 2;

                    if (mx + mSize < boardW && my + mSize < boardH) {
                        const roi = charucoBoardImage.roi(new cv.Rect(mx, my, mSize, mSize));
                        marker.copyTo(roi);
                    }

                    marker.delete();
                    markerIdx++;
                }
            }
        }

        // Add title
        cv.putText(charucoBoardImage, 'ChArUco-style Board 5x7', new cv.Point(20, boardH - 15),
            cv.FONT_HERSHEY_SIMPLEX, 0.6, new cv.Scalar(0), 2);

        saveImage(charucoBoardImage, 'charuco_board.ppm');
        console.log(`  Generated ${squaresX}x${squaresY} ChArUco-style board`);
    }

    charucoBoardImage.delete();

    // ============================================
    // 4. Generate Test Scene with Markers
    // ============================================
    console.log('\n=== Generating Test Scene ===');

    const sceneWidth = 800;
    const sceneHeight = 600;
    const scene = new cv.Mat(sceneHeight, sceneWidth, cv.CV_8UC3);
    scene.setTo(new cv.Scalar(240, 240, 240)); // Light gray background

    // Add some visual elements (simulating a desk/table scene)
    // Draw a "table" area
    cv.rectangle(scene, new cv.Point(50, 100), new cv.Point(750, 550),
        new cv.Scalar(200, 180, 160), -1);
    cv.rectangle(scene, new cv.Point(50, 100), new cv.Point(750, 550),
        new cv.Scalar(150, 130, 110), 3);

    // Place markers at different positions and sizes
    const markerPlacements = [
        { id: 0, x: 100, y: 150, size: 120 },
        { id: 1, x: 550, y: 130, size: 100 },
        { id: 2, x: 80, y: 380, size: 140 },
        { id: 3, x: 500, y: 350, size: 130 },
        { id: 4, x: 300, y: 250, size: 110 },
    ];

    for (const placement of markerPlacements) {
        const marker = new cv.Mat();
        cv.generateImageMarker(dictionary, placement.id, placement.size, marker, 1);

        // Convert marker to 3-channel
        const markerColor = new cv.Mat();
        cv.cvtColor(marker, markerColor, cv.COLOR_GRAY2BGR);

        // Add white border
        const bordered = new cv.Mat();
        cv.copyMakeBorder(markerColor, bordered, 5, 5, 5, 5, cv.BORDER_CONSTANT, new cv.Scalar(255, 255, 255));

        // Copy to scene
        const finalSize = placement.size + 10;
        if (placement.x + finalSize < sceneWidth && placement.y + finalSize < sceneHeight) {
            const roi = scene.roi(new cv.Rect(placement.x, placement.y, finalSize, finalSize));
            bordered.copyTo(roi);
        }

        marker.delete();
        markerColor.delete();
        bordered.delete();
    }

    // Add title and instructions
    cv.putText(scene, 'ArUco Test Scene - Point camera here to detect markers',
        new cv.Point(80, 50), cv.FONT_HERSHEY_SIMPLEX, 0.6, new cv.Scalar(50, 50, 50), 2);
    cv.putText(scene, 'Contains markers: 0, 1, 2, 3, 4 (DICT_6X6_250)',
        new cv.Point(80, 580), cv.FONT_HERSHEY_SIMPLEX, 0.5, new cv.Scalar(100, 100, 100), 1);

    saveImage(scene, 'test_scene.ppm');
    console.log('  Generated test scene with 5 markers');
    scene.delete();

    // ============================================
    // 5. Generate Single Large Marker for Easy Testing
    // ============================================
    console.log('\n=== Generating Large Print Marker ===');

    const largeMarker = new cv.Mat();
    cv.generateImageMarker(dictionary, 42, 400, largeMarker, 1);

    // Add large border and label
    const largeBordered = new cv.Mat();
    cv.copyMakeBorder(largeMarker, largeBordered, 50, 80, 50, 50, cv.BORDER_CONSTANT, new cv.Scalar(255));

    // Convert to BGR for colored text
    const largeBorderedColor = new cv.Mat();
    cv.cvtColor(largeBordered, largeBorderedColor, cv.COLOR_GRAY2BGR);

    cv.putText(largeBorderedColor, 'ArUco Marker ID: 42', new cv.Point(100, 510),
        cv.FONT_HERSHEY_SIMPLEX, 1, new cv.Scalar(0, 0, 0), 2);
    cv.putText(largeBorderedColor, 'Dictionary: DICT_6X6_250', new cv.Point(100, 545),
        cv.FONT_HERSHEY_SIMPLEX, 0.7, new cv.Scalar(100, 100, 100), 1);

    saveImage(largeBorderedColor, 'aruco_marker_42_large.ppm');
    console.log('  Generated large marker ID 42 (400x400px)');

    largeMarker.delete();
    largeBordered.delete();
    largeBorderedColor.delete();

    // Cleanup
    dictionary.delete();

    console.log('\n=== Generation Complete ===');
    console.log(`\nAll images saved to: ${outputDir}`);
    console.log('\nNote: Images are saved in PPM format.');
    console.log('You can convert to PNG using ImageMagick:');
    console.log('  convert image.ppm image.png');
    console.log('\nOr open directly in most image viewers/browsers.');

    process.exit(0);
})();
