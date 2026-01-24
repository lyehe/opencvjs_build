/**
 * Contour Detection with OpenCV.js
 *
 * Demonstrates:
 * - Finding contours
 * - Drawing contours
 * - Contour properties (area, perimeter, bounding rect)
 * - Contour approximation
 * - Convex hull
 * - Moments and centroid
 *
 * Run: node examples/node/contours.js
 */

(async () => {
    console.log('Loading OpenCV.js...');
    const cv = await require('../../dist/full/opencv.js');
    console.log('OpenCV.js loaded successfully!\n');

    // Create a test image with various shapes
    const src = new cv.Mat(400, 400, cv.CV_8UC3);
    src.setTo(new cv.Scalar(255, 255, 255)); // White background

    // Draw filled shapes for contour detection
    // Circle
    cv.circle(src, new cv.Point(80, 80), 50, new cv.Scalar(0, 0, 0), -1);

    // Rectangle
    cv.rectangle(src, new cv.Point(180, 30), new cv.Point(280, 130), new cv.Scalar(0, 0, 0), -1);

    // Triangle (using fillPoly)
    const trianglePoints = cv.matFromArray(3, 1, cv.CV_32SC2, [
        80, 180,   // top
        30, 280,   // bottom left
        130, 280   // bottom right
    ]);
    const triangleContours = new cv.MatVector();
    triangleContours.push_back(trianglePoints);
    cv.fillPoly(src, triangleContours, new cv.Scalar(0, 0, 0));

    // Star shape (complex polygon)
    const starPoints = cv.matFromArray(10, 1, cv.CV_32SC2, [
        230, 180,  // top
        245, 230,
        300, 230,
        255, 260,
        270, 310,
        230, 280,  // bottom
        190, 310,
        205, 260,
        160, 230,
        215, 230
    ]);
    const starContours = new cv.MatVector();
    starContours.push_back(starPoints);
    cv.fillPoly(src, starContours, new cv.Scalar(0, 0, 0));

    // Nested shapes (donut)
    cv.circle(src, new cv.Point(320, 320), 50, new cv.Scalar(0, 0, 0), -1);
    cv.circle(src, new cv.Point(320, 320), 25, new cv.Scalar(255, 255, 255), -1);

    console.log('Created test image with various shapes\n');

    // Convert to grayscale and threshold
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY);

    const binary = new cv.Mat();
    cv.threshold(gray, binary, 127, 255, cv.THRESH_BINARY_INV);

    // ============================================
    // Example 1: Find Contours
    // ============================================
    console.log('=== Example 1: Finding Contours ===');

    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();

    cv.findContours(
        binary.clone(), // findContours modifies input, so use clone
        contours,
        hierarchy,
        cv.RETR_TREE,        // Retrieval mode
        cv.CHAIN_APPROX_SIMPLE  // Approximation method
    );

    console.log(`Found ${contours.size()} contours`);

    // Explain retrieval modes
    console.log('\nRetrieval modes:');
    console.log('  RETR_EXTERNAL - only outermost contours');
    console.log('  RETR_LIST - all contours without hierarchy');
    console.log('  RETR_TREE - full hierarchy');

    // ============================================
    // Example 2: Draw Contours
    // ============================================
    console.log('\n=== Example 2: Drawing Contours ===');

    const drawing = src.clone();

    // Draw all contours in green
    cv.drawContours(
        drawing,
        contours,
        -1,  // Draw all contours
        new cv.Scalar(0, 255, 0),
        2    // Line thickness
    );
    console.log('Drew all contours in green');

    // Draw specific contour in red
    if (contours.size() > 0) {
        cv.drawContours(
            drawing,
            contours,
            0,   // Draw first contour
            new cv.Scalar(0, 0, 255),
            3
        );
        console.log('Drew first contour in red (thicker)');
    }

    // ============================================
    // Example 3: Contour Properties
    // ============================================
    console.log('\n=== Example 3: Contour Properties ===');

    for (let i = 0; i < Math.min(contours.size(), 5); i++) {
        const contour = contours.get(i);

        // Area
        const area = cv.contourArea(contour);

        // Perimeter (arc length)
        const perimeter = cv.arcLength(contour, true);

        // Bounding rectangle
        const boundingRect = cv.boundingRect(contour);

        // Min area rectangle
        const minAreaRect = cv.minAreaRect(contour);

        // Min enclosing circle
        const center = new cv.Point();
        const radius = { radius: 0 };
        cv.minEnclosingCircle(contour, center, radius);

        console.log(`\nContour ${i}:`);
        console.log(`  Points: ${contour.rows}`);
        console.log(`  Area: ${area.toFixed(1)} pixels`);
        console.log(`  Perimeter: ${perimeter.toFixed(1)} pixels`);
        console.log(`  Bounding Rect: (${boundingRect.x}, ${boundingRect.y}) ${boundingRect.width}x${boundingRect.height}`);
        console.log(`  Min Enclosing Circle: center=(${center.x.toFixed(1)}, ${center.y.toFixed(1)}), radius=${radius.radius.toFixed(1)}`);
    }

    // ============================================
    // Example 4: Contour Approximation
    // ============================================
    console.log('\n=== Example 4: Contour Approximation ===');

    if (contours.size() > 0) {
        const contour = contours.get(0);
        const perimeter = cv.arcLength(contour, true);

        // Approximate polygon with different epsilon values
        const epsilons = [0.01, 0.02, 0.05];

        for (const eps of epsilons) {
            const approx = new cv.Mat();
            cv.approxPolyDP(contour, approx, eps * perimeter, true);
            console.log(`  epsilon=${eps}: ${contour.rows} points -> ${approx.rows} points`);
            approx.delete();
        }
    }

    // ============================================
    // Example 5: Convex Hull
    // ============================================
    console.log('\n=== Example 5: Convex Hull ===');

    if (contours.size() > 0) {
        for (let i = 0; i < Math.min(contours.size(), 3); i++) {
            const contour = contours.get(i);
            const hull = new cv.Mat();
            cv.convexHull(contour, hull);

            const isConvex = cv.isContourConvex(contour);
            const hullIsConvex = cv.isContourConvex(hull);

            console.log(`  Contour ${i}: ${contour.rows} points, convex: ${isConvex}`);
            console.log(`    Hull: ${hull.rows} points, convex: ${hullIsConvex}`);

            hull.delete();
        }
    }

    // ============================================
    // Example 6: Moments and Centroid
    // ============================================
    console.log('\n=== Example 6: Moments and Centroid ===');

    if (contours.size() > 0) {
        for (let i = 0; i < Math.min(contours.size(), 3); i++) {
            const contour = contours.get(i);
            const moments = cv.moments(contour);

            // Calculate centroid
            if (moments.m00 !== 0) {
                const cx = moments.m10 / moments.m00;
                const cy = moments.m01 / moments.m00;
                console.log(`  Contour ${i} centroid: (${cx.toFixed(1)}, ${cy.toFixed(1)})`);

                // Draw centroid on image
                cv.circle(drawing, new cv.Point(cx, cy), 5, new cv.Scalar(255, 0, 255), -1);
            }
        }
        console.log('Drew centroids in magenta');
    }

    // ============================================
    // Example 7: Shape Matching
    // ============================================
    console.log('\n=== Example 7: Shape Matching (Hu Moments) ===');

    if (contours.size() >= 2) {
        const contour1 = contours.get(0);
        const contour2 = contours.get(1);

        // Compare shapes using Hu moments
        // Lower value = more similar
        const match1 = cv.matchShapes(contour1, contour1, cv.CONTOURS_MATCH_I1, 0);
        const match2 = cv.matchShapes(contour1, contour2, cv.CONTOURS_MATCH_I1, 0);

        console.log(`  Contour 0 vs itself: ${match1.toFixed(6)} (should be 0)`);
        console.log(`  Contour 0 vs Contour 1: ${match2.toFixed(6)}`);
    }

    // ============================================
    // Example 8: Hierarchy Analysis
    // ============================================
    console.log('\n=== Example 8: Contour Hierarchy ===');

    console.log('Hierarchy format: [Next, Previous, FirstChild, Parent]');
    for (let i = 0; i < Math.min(contours.size(), 5); i++) {
        const next = hierarchy.intAt(0, i * 4);
        const prev = hierarchy.intAt(0, i * 4 + 1);
        const child = hierarchy.intAt(0, i * 4 + 2);
        const parent = hierarchy.intAt(0, i * 4 + 3);
        console.log(`  Contour ${i}: [${next}, ${prev}, ${child}, ${parent}]`);
    }

    // ============================================
    // Clean up
    // ============================================
    console.log('\n=== Cleaning up ===');

    src.delete();
    gray.delete();
    binary.delete();
    contours.delete();
    hierarchy.delete();
    drawing.delete();
    trianglePoints.delete();
    triangleContours.delete();
    starPoints.delete();
    starContours.delete();

    console.log('All resources cleaned up');

    console.log('\n✓ Contours example completed successfully!');
})();
