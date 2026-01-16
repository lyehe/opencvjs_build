/**
 * OpenCV.js TypeScript Definitions
 *
 * This is a minimal type definition for OpenCV.js.
 * For complete types, consider using @types/opencv or generating
 * types from the OpenCV build.
 */

declare namespace cv {
    // Core classes
    class Mat {
        constructor();
        constructor(rows: number, cols: number, type: number);
        constructor(rows: number, cols: number, type: number, scalar: Scalar);
        constructor(size: Size, type: number);
        constructor(mat: Mat);

        rows: number;
        cols: number;
        data: Uint8Array;
        data8S: Int8Array;
        data16U: Uint16Array;
        data16S: Int16Array;
        data32S: Int32Array;
        data32F: Float32Array;
        data64F: Float64Array;

        size(): Size;
        type(): number;
        channels(): number;
        depth(): number;
        empty(): boolean;
        clone(): Mat;
        copyTo(dst: Mat): void;
        convertTo(dst: Mat, rtype: number, alpha?: number, beta?: number): void;
        setTo(scalar: Scalar): Mat;
        delete(): void;

        roi(rect: Rect): Mat;
        col(x: number): Mat;
        row(y: number): Mat;

        ucharPtr(row: number, col?: number): Uint8Array;
        charPtr(row: number, col?: number): Int8Array;
        shortPtr(row: number, col?: number): Int16Array;
        ushortPtr(row: number, col?: number): Uint16Array;
        intPtr(row: number, col?: number): Int32Array;
        floatPtr(row: number, col?: number): Float32Array;
        doublePtr(row: number, col?: number): Float64Array;
    }

    class Size {
        constructor();
        constructor(width: number, height: number);
        width: number;
        height: number;
    }

    class Point {
        constructor();
        constructor(x: number, y: number);
        x: number;
        y: number;
    }

    class Scalar {
        constructor();
        constructor(v0: number, v1?: number, v2?: number, v3?: number);
        0: number;
        1: number;
        2: number;
        3: number;
    }

    class Rect {
        constructor();
        constructor(x: number, y: number, width: number, height: number);
        x: number;
        y: number;
        width: number;
        height: number;
    }

    class RotatedRect {
        constructor();
        constructor(center: Point, size: Size, angle: number);
        center: Point;
        size: Size;
        angle: number;
        points(): Point[];
        boundingRect(): Rect;
    }

    // Mat types
    const CV_8U: number;
    const CV_8S: number;
    const CV_16U: number;
    const CV_16S: number;
    const CV_32S: number;
    const CV_32F: number;
    const CV_64F: number;
    const CV_8UC1: number;
    const CV_8UC2: number;
    const CV_8UC3: number;
    const CV_8UC4: number;
    const CV_32FC1: number;
    const CV_32FC2: number;
    const CV_32FC3: number;
    const CV_32FC4: number;

    // Color conversion codes
    const COLOR_BGR2GRAY: number;
    const COLOR_RGB2GRAY: number;
    const COLOR_GRAY2BGR: number;
    const COLOR_GRAY2RGB: number;
    const COLOR_BGR2RGB: number;
    const COLOR_RGB2BGR: number;
    const COLOR_BGR2HSV: number;
    const COLOR_RGB2HSV: number;
    const COLOR_HSV2BGR: number;
    const COLOR_HSV2RGB: number;
    const COLOR_RGBA2GRAY: number;
    const COLOR_GRAY2RGBA: number;
    const COLOR_RGBA2RGB: number;
    const COLOR_RGB2RGBA: number;
    const COLOR_RGBA2BGR: number;
    const COLOR_BGR2RGBA: number;
    const COLOR_BGRA2GRAY: number;
    const COLOR_GRAY2BGRA: number;
    const COLOR_BGRA2BGR: number;
    const COLOR_BGR2BGRA: number;
    const COLOR_BGRA2RGB: number;
    const COLOR_RGB2BGRA: number;
    const COLOR_BGRA2RGBA: number;
    const COLOR_RGBA2BGRA: number;

    // Core functions
    function matFromImageData(imageData: ImageData): Mat;
    function matFromArray(rows: number, cols: number, type: number, array: ArrayLike<number>): Mat;

    // Image processing
    function cvtColor(src: Mat, dst: Mat, code: number, dstCn?: number): void;
    function resize(src: Mat, dst: Mat, dsize: Size, fx?: number, fy?: number, interpolation?: number): void;
    function GaussianBlur(src: Mat, dst: Mat, ksize: Size, sigmaX: number, sigmaY?: number, borderType?: number): void;
    function blur(src: Mat, dst: Mat, ksize: Size, anchor?: Point, borderType?: number): void;
    function medianBlur(src: Mat, dst: Mat, ksize: number): void;
    function bilateralFilter(src: Mat, dst: Mat, d: number, sigmaColor: number, sigmaSpace: number, borderType?: number): void;
    function Canny(src: Mat, dst: Mat, threshold1: number, threshold2: number, apertureSize?: number, L2gradient?: boolean): void;
    function threshold(src: Mat, dst: Mat, thresh: number, maxval: number, type: number): number;
    function adaptiveThreshold(src: Mat, dst: Mat, maxValue: number, adaptiveMethod: number, thresholdType: number, blockSize: number, C: number): void;

    // Morphological operations
    function erode(src: Mat, dst: Mat, kernel: Mat, anchor?: Point, iterations?: number, borderType?: number, borderValue?: Scalar): void;
    function dilate(src: Mat, dst: Mat, kernel: Mat, anchor?: Point, iterations?: number, borderType?: number, borderValue?: Scalar): void;
    function morphologyEx(src: Mat, dst: Mat, op: number, kernel: Mat, anchor?: Point, iterations?: number, borderType?: number, borderValue?: Scalar): void;
    function getStructuringElement(shape: number, ksize: Size, anchor?: Point): Mat;

    // Contours
    function findContours(image: Mat, contours: MatVector, hierarchy: Mat, mode: number, method: number, offset?: Point): void;
    function drawContours(image: Mat, contours: MatVector, contourIdx: number, color: Scalar, thickness?: number, lineType?: number, hierarchy?: Mat, maxLevel?: number, offset?: Point): void;
    function contourArea(contour: Mat, oriented?: boolean): number;
    function arcLength(curve: Mat, closed: boolean): number;
    function boundingRect(points: Mat): Rect;
    function minAreaRect(points: Mat): RotatedRect;

    // Drawing
    function line(img: Mat, pt1: Point, pt2: Point, color: Scalar, thickness?: number, lineType?: number, shift?: number): void;
    function rectangle(img: Mat, pt1: Point, pt2: Point, color: Scalar, thickness?: number, lineType?: number, shift?: number): void;
    function circle(img: Mat, center: Point, radius: number, color: Scalar, thickness?: number, lineType?: number, shift?: number): void;
    function ellipse(img: Mat, center: Point, axes: Size, angle: number, startAngle: number, endAngle: number, color: Scalar, thickness?: number, lineType?: number, shift?: number): void;
    function putText(img: Mat, text: string, org: Point, fontFace: number, fontScale: number, color: Scalar, thickness?: number, lineType?: number, bottomLeftOrigin?: boolean): void;

    // Feature detection
    class ORB {
        constructor(nfeatures?: number);
        detect(image: Mat, keypoints: KeyPointVector): void;
        compute(image: Mat, keypoints: KeyPointVector, descriptors: Mat): void;
        detectAndCompute(image: Mat, mask: Mat, keypoints: KeyPointVector, descriptors: Mat): void;
        delete(): void;
    }

    class AKAZE {
        constructor();
        detect(image: Mat, keypoints: KeyPointVector): void;
        compute(image: Mat, keypoints: KeyPointVector, descriptors: Mat): void;
        detectAndCompute(image: Mat, mask: Mat, keypoints: KeyPointVector, descriptors: Mat): void;
        delete(): void;
    }

    class KeyPoint {
        constructor();
        constructor(x: number, y: number, size: number, angle?: number, response?: number, octave?: number, class_id?: number);
        pt: Point;
        size: number;
        angle: number;
        response: number;
        octave: number;
        class_id: number;
    }

    class KeyPointVector {
        constructor();
        size(): number;
        get(index: number): KeyPoint;
        push_back(keypoint: KeyPoint): void;
        delete(): void;
    }

    class DMatch {
        constructor();
        queryIdx: number;
        trainIdx: number;
        distance: number;
    }

    class DMatchVector {
        constructor();
        size(): number;
        get(index: number): DMatch;
        push_back(match: DMatch): void;
        delete(): void;
    }

    class DMatchVectorVector {
        constructor();
        size(): number;
        get(index: number): DMatchVector;
        delete(): void;
    }

    class BFMatcher {
        constructor(normType?: number, crossCheck?: boolean);
        match(queryDescriptors: Mat, trainDescriptors: Mat, matches: DMatchVector): void;
        knnMatch(queryDescriptors: Mat, trainDescriptors: Mat, matches: DMatchVectorVector, k: number): void;
        delete(): void;
    }

    // Utility classes
    class MatVector {
        constructor();
        size(): number;
        get(index: number): Mat;
        push_back(mat: Mat): void;
        delete(): void;
    }

    class RectVector {
        constructor();
        size(): number;
        get(index: number): Rect;
        push_back(rect: Rect): void;
        delete(): void;
    }

    // Video
    class VideoCapture {
        constructor(videoElement: HTMLVideoElement);
        read(mat: Mat): boolean;
        delete(): void;
    }

    // Cascade classifier (for face detection, etc.)
    class CascadeClassifier {
        constructor();
        load(filename: string): boolean;
        detectMultiScale(image: Mat, objects: RectVector, scaleFactor?: number, minNeighbors?: number, flags?: number, minSize?: Size, maxSize?: Size): void;
        delete(): void;
    }

    // DNN module
    namespace dnn {
        class Net {
            constructor();
            setInput(blob: Mat, name?: string): void;
            forward(outputName?: string): Mat;
            delete(): void;
        }

        function readNetFromCaffe(prototxt: string, caffeModel: string): Net;
        function readNetFromTensorflow(model: string, config?: string): Net;
        function readNetFromONNX(onnxFile: string): Net;
        function blobFromImage(image: Mat, scalefactor?: number, size?: Size, mean?: Scalar, swapRB?: boolean, crop?: boolean, ddepth?: number): Mat;
    }

    // Initialization callback
    let onRuntimeInitialized: () => void;

    // Utility functions
    function getBuildInformation(): string;
}

declare module 'opencv-contrib-wasm' {
    export = cv;
}

export = cv;
export as namespace cv;
