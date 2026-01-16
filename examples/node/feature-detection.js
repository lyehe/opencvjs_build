/**
 * Feature Detection with OpenCV.js
 *
 * Demonstrates:
 * - ORB (Oriented FAST and Rotated BRIEF)
 * - AKAZE (Accelerated-KAZE)
 * - BRISK (Binary Robust Invariant Scalable Keypoints)
 * - Simple Blob Detector
 * - Good Features to Track (Shi-Tomasi corners)
 *
 * Run: node examples/node/feature-detection.js
 */

(async () => {
    console.log('Loading OpenCV.js...');
    const cv = await require('../../dist/opencv.js');
    console.log('OpenCV.js loaded successfully!\n');

    // Create a test image with features
    const src = new cv.Mat(300, 300, cv.CV_8UC3);
    src.setTo(new cv.Scalar(255, 255, 255)); // White background

    // Draw various shapes to create detectable features
    // Rectangles
    cv.rectangle(src, new cv.Point(20, 20), new cv.Point(80, 80), new cv.Scalar(0, 0, 0), 2);
    cv.rectangle(src, new cv.Point(220, 20), new cv.Point(280, 80), new cv.Scalar(0, 0, 0), 2);
    cv.rectangle(src, new cv.Point(20, 220), new cv.Point(80, 280), new cv.Scalar(0, 0, 0), 2);
    cv.rectangle(src, new cv.Point(220, 220), new cv.Point(280, 280), new cv.Scalar(0, 0, 0), 2);

    // Circles
    cv.circle(src, new cv.Point(150, 150), 40, new cv.Scalar(0, 0, 0), 2);
    cv.circle(src, new cv.Point(150, 150), 20, new cv.Scalar(128, 128, 128), -1);

    // Lines creating corners
    cv.line(src, new cv.Point(100, 100), new cv.Point(200, 100), new cv.Scalar(0, 0, 0), 2);
    cv.line(src, new cv.Point(100, 100), new cv.Point(100, 200), new cv.Scalar(0, 0, 0), 2);
    cv.line(src, new cv.Point(200, 100), new cv.Point(200, 200), new cv.Scalar(0, 0, 0), 2);
    cv.line(src, new cv.Point(100, 200), new cv.Point(200, 200), new cv.Scalar(0, 0, 0), 2);

    // Small features (dots)
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            cv.circle(src, new cv.Point(50 + i * 50, 110 + j * 20), 3, new cv.Scalar(0, 0, 0), -1);
        }
    }

    console.log('Created test image with various features\n');

    // Convert to grayscale for feature detection
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY);

    // ============================================
    // Example 1: ORB Feature Detection
    // ============================================
    console.log('=== Example 1: ORB Feature Detection ===');

    const orb = new cv.ORB(500); // Max 500 features
    const orbKeypoints = new cv.KeyPointVector();
    const orbDescriptors = new cv.Mat();

    orb.detectAndCompute(gray, new cv.Mat(), orbKeypoints, orbDescriptors);
    console.log(`ORB detected ${orbKeypoints.size()} keypoints`);

    if (orbKeypoints.size() > 0) {
        const kp0 = orbKeypoints.get(0);
        console.log(`  First keypoint: (${kp0.pt.x.toFixed(1)}, ${kp0.pt.y.toFixed(1)}), size=${kp0.size.toFixed(1)}, angle=${kp0.angle.toFixed(1)}`);
    }
    console.log(`  Descriptor shape: ${orbDescriptors.rows}x${orbDescriptors.cols}`);

    // ============================================
    // Example 2: AKAZE Feature Detection
    // ============================================
    console.log('\n=== Example 2: AKAZE Feature Detection ===');

    const akaze = new cv.AKAZE();
    const akazeKeypoints = new cv.KeyPointVector();
    const akazeDescriptors = new cv.Mat();

    akaze.detectAndCompute(gray, new cv.Mat(), akazeKeypoints, akazeDescriptors);
    console.log(`AKAZE detected ${akazeKeypoints.size()} keypoints`);

    if (akazeKeypoints.size() > 0) {
        const kp0 = akazeKeypoints.get(0);
        console.log(`  First keypoint: (${kp0.pt.x.toFixed(1)}, ${kp0.pt.y.toFixed(1)}), size=${kp0.size.toFixed(1)}`);
    }
    console.log(`  Descriptor shape: ${akazeDescriptors.rows}x${akazeDescriptors.cols}`);

    // ============================================
    // Example 3: BRISK Feature Detection
    // ============================================
    console.log('\n=== Example 3: BRISK Feature Detection ===');

    const brisk = new cv.BRISK();
    const briskKeypoints = new cv.KeyPointVector();
    const briskDescriptors = new cv.Mat();

    brisk.detectAndCompute(gray, new cv.Mat(), briskKeypoints, briskDescriptors);
    console.log(`BRISK detected ${briskKeypoints.size()} keypoints`);

    if (briskKeypoints.size() > 0) {
        const kp0 = briskKeypoints.get(0);
        console.log(`  First keypoint: (${kp0.pt.x.toFixed(1)}, ${kp0.pt.y.toFixed(1)}), size=${kp0.size.toFixed(1)}`);
    }
    console.log(`  Descriptor shape: ${briskDescriptors.rows}x${briskDescriptors.cols}`);

    // ============================================
    // Example 4: Good Features to Track (Shi-Tomasi)
    // ============================================
    console.log('\n=== Example 4: Good Features to Track ===');

    const corners = new cv.Mat();
    cv.goodFeaturesToTrack(
        gray,
        corners,
        100,    // maxCorners
        0.01,   // qualityLevel
        10,     // minDistance
        new cv.Mat(),
        3,      // blockSize
        false,  // useHarrisDetector
        0.04    // k
    );
    console.log(`Shi-Tomasi detected ${corners.rows} corners`);

    if (corners.rows > 0) {
        const x = corners.floatAt(0, 0);
        const y = corners.floatAt(0, 1);
        console.log(`  First corner: (${x.toFixed(1)}, ${y.toFixed(1)})`);
    }

    // ============================================
    // Example 5: Harris Corner Detection
    // ============================================
    console.log('\n=== Example 5: Harris Corner Detection ===');

    const harris = new cv.Mat();
    cv.cornerHarris(gray, harris, 2, 3, 0.04);

    // Normalize and count significant corners
    const harrisNorm = new cv.Mat();
    cv.normalize(harris, harrisNorm, 0, 255, cv.NORM_MINMAX, cv.CV_32FC1);

    // Count corners above threshold
    let harrisCorners = 0;
    for (let y = 0; y < harrisNorm.rows; y++) {
        for (let x = 0; x < harrisNorm.cols; x++) {
            if (harrisNorm.floatAt(y, x) > 200) {
                harrisCorners++;
            }
        }
    }
    console.log(`Harris detected approximately ${harrisCorners} corner pixels`);

    // ============================================
    // Example 6: Drawing Keypoints
    // ============================================
    console.log('\n=== Example 6: Drawing Keypoints ===');

    const output = new cv.Mat();
    cv.drawKeypoints(
        src,
        orbKeypoints,
        output,
        new cv.Scalar(0, 255, 0),
        cv.DrawMatchesFlags_DRAW_RICH_KEYPOINTS
    );
    console.log(`Drew ${orbKeypoints.size()} keypoints with size and orientation`);

    // ============================================
    // Example 7: Feature Matching (between same image - demo)
    // ============================================
    console.log('\n=== Example 7: Feature Matching (BFMatcher) ===');

    // Create a slightly modified version of the image
    const src2 = src.clone();
    cv.GaussianBlur(src2, src2, new cv.Size(3, 3), 0);

    const gray2 = new cv.Mat();
    cv.cvtColor(src2, gray2, cv.COLOR_BGR2GRAY);

    const kp2 = new cv.KeyPointVector();
    const desc2 = new cv.Mat();
    orb.detectAndCompute(gray2, new cv.Mat(), kp2, desc2);

    // Match features using BFMatcher
    const bf = new cv.BFMatcher(cv.NORM_HAMMING, true);
    const matches = new cv.DMatchVector();

    if (orbDescriptors.rows > 0 && desc2.rows > 0) {
        bf.match(orbDescriptors, desc2, matches);
        console.log(`Matched ${matches.size()} features between original and blurred image`);

        if (matches.size() > 0) {
            // Sort by distance and show top matches
            const matchArray = [];
            for (let i = 0; i < Math.min(5, matches.size()); i++) {
                const m = matches.get(i);
                matchArray.push({ queryIdx: m.queryIdx, trainIdx: m.trainIdx, distance: m.distance });
            }
            matchArray.sort((a, b) => a.distance - b.distance);
            console.log(`  Top 3 matches (by distance):`);
            for (let i = 0; i < Math.min(3, matchArray.length); i++) {
                const m = matchArray[i];
                console.log(`    Match ${i + 1}: queryIdx=${m.queryIdx}, trainIdx=${m.trainIdx}, distance=${m.distance.toFixed(1)}`);
            }
        }
    }

    // ============================================
    // Clean up
    // ============================================
    console.log('\n=== Cleaning up ===');
    const objects = [
        src, gray, src2, gray2, output,
        orbKeypoints, orbDescriptors, orb,
        akazeKeypoints, akazeDescriptors, akaze,
        briskKeypoints, briskDescriptors, brisk,
        corners, harris, harrisNorm,
        kp2, desc2, bf, matches
    ];
    objects.forEach(obj => obj.delete());
    console.log(`Deleted ${objects.length} OpenCV objects`);

    console.log('\n✓ Feature detection example completed successfully!');
})();
