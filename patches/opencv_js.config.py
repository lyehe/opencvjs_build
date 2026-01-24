# Classes and methods whitelist

core = {
    '': [
        'absdiff', 'add', 'addWeighted', 'bitwise_and', 'bitwise_not', 'bitwise_or', 'bitwise_xor', 'cartToPolar',
        'compare', 'convertScaleAbs', 'copyMakeBorder', 'countNonZero', 'determinant', 'dft', 'divide', 'eigen',
        'exp', 'flip', 'getOptimalDFTSize','gemm', 'hconcat', 'inRange', 'invert', 'kmeans', 'log', 'magnitude',
        'max', 'mean', 'meanStdDev', 'merge', 'min', 'minMaxLoc', 'mixChannels', 'multiply', 'norm', 'normalize',
        'perspectiveTransform', 'polarToCart', 'pow', 'randn', 'randu', 'reduce', 'repeat', 'rotate', 'setIdentity', 'setRNGSeed',
        'solve', 'solvePoly', 'split', 'sqrt', 'subtract', 'trace', 'transform', 'transpose', 'vconcat',
        'setLogLevel', 'getLogLevel',
        'LUT',
    ],
    'Algorithm': [],
}

imgproc = {
    '': [
        'adaptiveThreshold',
        'applyColorMap',
        'approxPolyDP',
        'approxPolyN',
        'arcLength',
        'arrowedLine',
        'bilateralFilter',
        'blendLinear',
        'blur',
        'boundingRect',
        'boxFilter',
        'calcBackProject',
        'calcHist',
        'Canny',
        'circle',
        'clipLine',
        'compareHist',
        'connectedComponents',
        'connectedComponentsWithStats',
        'contourArea',
        'convertMaps',
        'convexHull',
        'convexityDefects',
        'cornerHarris',
        'cornerMinEigenVal',
        'createCLAHE',
        'createHanningWindow',
        'createLineSegmentDetector',
        'cvtColor',
        'demosaicing',
        'dilate',
        'distanceTransform',
        'distanceTransformWithLabels',
        'divSpectrums',
        'drawContours',
        'drawMarker',
        'ellipse',
        'ellipse2Poly',
        'equalizeHist',
        'erode',
        'fillConvexPoly',
        'fillPoly',
        'filter2D',
        'findContours',
        'findContoursLinkRuns',
        'fitEllipse',
        'fitEllipseAMS',
        'fitEllipseDirect',
        'fitLine',
        'floodFill',
        'GaussianBlur',
        'getAffineTransform',
        'getFontScaleFromHeight',
        'getPerspectiveTransform',
        'getRectSubPix',
        'getRotationMatrix2D',
        'getStructuringElement',
        'goodFeaturesToTrack',
        'grabCut',
        'HoughLines',
        'HoughLinesP',
        'HoughCircles',
        'HuMoments',
        'integral',
        'integral2',
        'intersectConvexConvex',
        'invertAffineTransform',
        'isContourConvex',
        'Laplacian',
        'line',
        'matchShapes',
        'matchTemplate',
        'medianBlur',
        'minAreaRect',
        'minEnclosingCircle',
        'minEnclosingTriangle',
        'moments',
        'morphologyEx',
        'pointPolygonTest',
        'polylines',
        'preCornerDetect',
        'putText',
        'pyrDown',
        'pyrUp',
        'rectangle',
        'remap',
        'resize',
        'rotatedRectangleIntersection',
        'Scharr',
        'sepFilter2D',
        'Sobel',
        'spatialGradient',
        'sqrBoxFilter',
        'stackBlur',
        'threshold',
        'warpAffine',
        'warpPerspective',
        'warpPolar',
        'watershed',
    ],
    'CLAHE': ['apply', 'collectGarbage', 'getClipLimit', 'getTilesGridSize', 'setClipLimit', 'setTilesGridSize'],
    'segmentation_IntelligentScissorsMB': [
        'IntelligentScissorsMB',
        'setWeights',
        'setGradientMagnitudeMaxLimit',
        'setEdgeFeatureZeroCrossingParameters',
        'setEdgeFeatureCannyParameters',
        'applyImage',
        'applyImageFeatures',
        'buildMap',
        'getContour'
    ],
}

objdetect = {'': ['groupRectangles', 'getPredefinedDictionary', 'extendDictionary',
                  'drawDetectedMarkers', 'generateImageMarker', 'drawDetectedCornersCharuco',
                  'drawDetectedDiamonds'],
             'HOGDescriptor': ['load', 'HOGDescriptor', 'getDefaultPeopleDetector', 'getDaimlerPeopleDetector', 'setSVMDetector', 'detectMultiScale'],
             'CascadeClassifier': ['load', 'detectMultiScale2', 'CascadeClassifier', 'detectMultiScale3', 'empty', 'detectMultiScale'],
             'GraphicalCodeDetector': ['decode', 'detect', 'detectAndDecode', 'detectMulti', 'decodeMulti', 'detectAndDecodeMulti'],
             'QRCodeDetector': ['QRCodeDetector', 'decode', 'detect', 'detectAndDecode', 'detectMulti', 'decodeMulti', 'detectAndDecodeMulti', 'decodeCurved', 'detectAndDecodeCurved', 'setEpsX', 'setEpsY'],
             'aruco_PredefinedDictionaryType': [],
             'aruco_Dictionary': ['Dictionary', 'getDistanceToId', 'generateImageMarker', 'getByteListFromBits', 'getBitsFromByteList'],
             'aruco_Board': ['Board', 'matchImagePoints', 'generateImage'],
             'aruco_GridBoard': ['GridBoard', 'generateImage', 'getGridSize', 'getMarkerLength', 'getMarkerSeparation', 'matchImagePoints'],
             'aruco_CharucoParameters': ['CharucoParameters'],
             'aruco_CharucoBoard': ['CharucoBoard', 'generateImage', 'getChessboardCorners', 'getNearestMarkerCorners', 'checkCharucoCornersCollinear', 'matchImagePoints', 'getLegacyPattern', 'setLegacyPattern'],
             'aruco_DetectorParameters': ['DetectorParameters'],
             'aruco_RefineParameters': ['RefineParameters'],
             'aruco_ArucoDetector': ['ArucoDetector', 'detectMarkers', 'refineDetectedMarkers', 'setDictionary', 'setDetectorParameters', 'setRefineParameters'],
             'aruco_CharucoDetector': ['CharucoDetector', 'setBoard', 'setCharucoParameters', 'setDetectorParameters', 'setRefineParameters', 'detectBoard', 'detectDiamonds'],
             'QRCodeDetectorAruco_Params': ['Params'],
             'QRCodeDetectorAruco': ['QRCodeDetectorAruco', 'decode', 'detect', 'detectAndDecode', 'detectMulti', 'decodeMulti', 'detectAndDecodeMulti', 'setDetectorParameters', 'setArucoParameters'],
             'barcode_BarcodeDetector': ['BarcodeDetector', 'decode', 'detect', 'detectAndDecode', 'detectMulti', 'decodeMulti', 'detectAndDecodeMulti', 'decodeWithType', 'detectAndDecodeWithType'],
             'FaceDetectorYN': ['setInputSize', 'getInputSize', 'setScoreThreshold', 'getScoreThreshold', 'setNMSThreshold', 'getNMSThreshold',
                                'setTopK', 'getTopK', 'detect', 'create'],
}

video = {
    '': [
        'CamShift',
        'calcOpticalFlowFarneback',
        'calcOpticalFlowPyrLK',
        'createBackgroundSubtractorMOG2',
        'findTransformECC',
        'meanShift',
    ],
    'BackgroundSubtractorMOG2': ['BackgroundSubtractorMOG2', 'apply'],
    'BackgroundSubtractor': ['apply', 'getBackgroundImage'],
    # issue #21070: 'Tracker': ['init', 'update'],
    'TrackerMIL': ['create'],
    'TrackerMIL_Params': [],
}

dnn = {'dnn_Net': ['setInput', 'forward', 'setPreferableBackend','getUnconnectedOutLayersNames'],
       '': ['readNetFromCaffe', 'readNetFromTensorflow', 'readNetFromTorch', 'readNetFromDarknet',
            'readNetFromONNX', 'readNetFromTFLite', 'readNet', 'blobFromImage']}

features2d = {'Feature2D': ['detect', 'compute', 'detectAndCompute', 'descriptorSize', 'descriptorType', 'defaultNorm', 'empty', 'getDefaultName'],
              'BRISK': ['create', 'getDefaultName'],
              'ORB': ['create', 'setMaxFeatures', 'setScaleFactor', 'setNLevels', 'setEdgeThreshold', 'setFastThreshold', 'setFirstLevel', 'setWTA_K', 'setScoreType', 'setPatchSize', 'getFastThreshold', 'getDefaultName'],
              'MSER': ['create', 'detectRegions', 'setDelta', 'getDelta', 'setMinArea', 'getMinArea', 'setMaxArea', 'getMaxArea', 'setPass2Only', 'getPass2Only', 'getDefaultName'],
              'FastFeatureDetector': ['create', 'setThreshold', 'getThreshold', 'setNonmaxSuppression', 'getNonmaxSuppression', 'setType', 'getType', 'getDefaultName'],
              'AgastFeatureDetector': ['create', 'setThreshold', 'getThreshold', 'setNonmaxSuppression', 'getNonmaxSuppression', 'setType', 'getType', 'getDefaultName'],
              'GFTTDetector': ['create', 'setMaxFeatures', 'getMaxFeatures', 'setQualityLevel', 'getQualityLevel', 'setMinDistance', 'getMinDistance', 'setBlockSize', 'getBlockSize', 'setHarrisDetector', 'getHarrisDetector', 'setK', 'getK', 'getDefaultName'],
              'SimpleBlobDetector': ['create', 'setParams', 'getParams', 'getDefaultName'],
              'SimpleBlobDetector_Params': [],
              'KAZE': ['create', 'setExtended', 'getExtended', 'setUpright', 'getUpright', 'setThreshold', 'getThreshold', 'setNOctaves', 'getNOctaves', 'setNOctaveLayers', 'getNOctaveLayers', 'setDiffusivity', 'getDiffusivity', 'getDefaultName'],
              'AKAZE': ['create', 'setDescriptorType', 'getDescriptorType', 'setDescriptorSize', 'getDescriptorSize', 'setDescriptorChannels', 'getDescriptorChannels', 'setThreshold', 'getThreshold', 'setNOctaves', 'getNOctaves', 'setNOctaveLayers', 'getNOctaveLayers', 'setDiffusivity', 'getDiffusivity', 'getDefaultName'],
              'DescriptorMatcher': ['add', 'clear', 'empty', 'isMaskSupported', 'train', 'match', 'knnMatch', 'radiusMatch', 'clone', 'create'],
              'BFMatcher': ['isMaskSupported', 'create'],
              '': ['drawKeypoints', 'drawMatches', 'drawMatchesKnn']}

photo = {'': ['createAlignMTB', 'createCalibrateDebevec', 'createCalibrateRobertson', \
              'createMergeDebevec', 'createMergeMertens', 'createMergeRobertson', \
              'createTonemapDrago', 'createTonemapMantiuk', 'createTonemapReinhard', 'inpaint'],
        'CalibrateCRF': ['process'],
        'AlignExposures': ['process'],
        'AlignMTB' : ['calculateShift', 'shiftMat', 'computeBitmaps', 'getMaxBits', 'setMaxBits', \
                      'getExcludeRange', 'setExcludeRange', 'getCut', 'setCut'],
        'CalibrateDebevec' : ['getLambda', 'setLambda', 'getSamples', 'setSamples', 'getRandom', 'setRandom'],
        'CalibrateRobertson' : ['getMaxIter', 'setMaxIter', 'getThreshold', 'setThreshold', 'getRadiance'],
        'MergeExposures' : ['process'],
        'MergeDebevec' : ['process'],
        'MergeMertens' : ['process', 'getContrastWeight', 'setContrastWeight', 'getSaturationWeight', \
                          'setSaturationWeight', 'getExposureWeight', 'setExposureWeight'],
        'MergeRobertson' : ['process'],
        'Tonemap' : ['process' , 'getGamma', 'setGamma'],
        'TonemapDrago' : ['getSaturation', 'setSaturation', 'getBias', 'setBias', \
                          'getSigmaColor', 'setSigmaColor', 'getSigmaSpace','setSigmaSpace'],
        'TonemapMantiuk' : ['getScale', 'setScale', 'getSaturation', 'setSaturation'],
        'TonemapReinhard' : ['getIntensity', 'setIntensity', 'getLightAdaptation', 'setLightAdaptation', \
                             'getColorAdaptation', 'setColorAdaptation']
        }

calib3d = {
    '': [
        'findHomography',
        'calibrateCameraExtended',
        'drawFrameAxes',
        'estimateAffine2D',
        'getDefaultNewCameraMatrix',
        'initUndistortRectifyMap',
        'Rodrigues',
        'solvePnP',
        'solvePnPRansac',
        'solvePnPRefineLM',
        'projectPoints',
        'undistort',

        # cv::fisheye namespace
        'fisheye_initUndistortRectifyMap',
        'fisheye_projectPoints',
    ],
    'UsacParams': ['UsacParams']
}

# ============= CONTRIB MODULES =============

# Machine Learning module
ml = {
    '': ['createConcentricSpheresTestSet'],
    'StatModel': ['train', 'predict', 'calcError', 'empty', 'isTrained', 'isClassifier', 'getVarCount'],
    'KNearest': ['create', 'getDefaultK', 'setDefaultK', 'getIsClassifier', 'setIsClassifier', 'getEmax', 'setEmax', 'getAlgorithmType', 'setAlgorithmType', 'findNearest'],
    'SVM': ['create', 'getType', 'setType', 'getGamma', 'setGamma', 'getCoef0', 'setCoef0', 'getDegree', 'setDegree', 'getC', 'setC', 'getNu', 'setNu', 'getP', 'setP', 'getKernelType', 'setKernel', 'trainAuto', 'getSupportVectors', 'getUncompressedSupportVectors'],
    'DTrees': ['create', 'getMaxCategories', 'setMaxCategories', 'getMaxDepth', 'setMaxDepth', 'getMinSampleCount', 'setMinSampleCount', 'getCVFolds', 'setCVFolds', 'getUseSurrogates', 'setUseSurrogates', 'getUse1SERule', 'setUse1SERule', 'getTruncatePrunedTree', 'setTruncatePrunedTree', 'getRegressionAccuracy', 'setRegressionAccuracy'],
    'RTrees': ['create', 'getActiveVarCount', 'setActiveVarCount', 'getTermCriteria', 'setTermCriteria', 'getCalculateVarImportance', 'setCalculateVarImportance', 'getVarImportance'],
    'Boost': ['create', 'getBoostType', 'setBoostType', 'getWeakCount', 'setWeakCount', 'getWeightTrimRate', 'setWeightTrimRate'],
    'ANN_MLP': ['create', 'getLayerSizes', 'setLayerSizes', 'getTermCriteria', 'setTermCriteria', 'getBackpropWeightScale', 'setBackpropWeightScale', 'getBackpropMomentumScale', 'setBackpropMomentumScale', 'getRpropDW0', 'setRpropDW0', 'getRpropDWPlus', 'setRpropDWPlus', 'getRpropDWMinus', 'setRpropDWMinus', 'getRpropDWMin', 'setRpropDWMin', 'getRpropDWMax', 'setRpropDWMax', 'getAnnealInitialT', 'setAnnealInitialT', 'getAnnealFinalT', 'setAnnealFinalT', 'getAnnealCoolingRatio', 'setAnnealCoolingRatio', 'getAnnealItePerStep', 'setAnnealItePerStep', 'setActivationFunction', 'setTrainMethod', 'getWeights'],
    'LogisticRegression': ['create', 'getLearningRate', 'setLearningRate', 'getIterations', 'setIterations', 'getRegularization', 'setRegularization', 'getTrainMethod', 'setTrainMethod', 'getMiniBatchSize', 'setMiniBatchSize', 'getTermCriteria', 'setTermCriteria', 'get_learnt_thetas'],
    'NormalBayesClassifier': ['create', 'predictProb'],
    'EM': ['create', 'getClustersNumber', 'setClustersNumber', 'getCovarianceMatrixType', 'setCovarianceMatrixType', 'getTermCriteria', 'setTermCriteria', 'getWeights', 'getMeans', 'getCovs', 'predict2', 'trainEM', 'trainE', 'trainM'],
    'TrainData': ['create', 'getTrainSamples', 'getTrainResponses', 'getTestSamples', 'getTestResponses', 'getVarIdx', 'getVarType', 'getResponseType', 'getNTrainSamples', 'getNTestSamples', 'getNSamples', 'getNVars', 'getNAllVars'],
}

# Stitching module
stitching = {
    'Stitcher': ['create', 'stitch', 'estimateTransform', 'composePanorama', 'setRegistrationResol', 'setSeamEstimationResol', 'setCompositingResol', 'setPanoConfidenceThresh', 'setWaveCorrection', 'setInterpolationFlags'],
}

# Shape module
shape = {
    '': ['EMDL1'],
    'ShapeDistanceExtractor': ['computeDistance'],
    'ShapeContextDistanceExtractor': ['create', 'setAngularBins', 'getAngularBins', 'setRadialBins', 'getRadialBins', 'setInnerRadius', 'getInnerRadius', 'setOuterRadius', 'getOuterRadius', 'setRotationInvariant', 'getRotationInvariant', 'setShapeContextWeight', 'getShapeContextWeight', 'setImageAppearanceWeight', 'getImageAppearanceWeight', 'setBendingEnergyWeight', 'getBendingEnergyWeight', 'setIterations', 'getIterations', 'setStdDev', 'getStdDev'],
    'HausdorffDistanceExtractor': ['create', 'setDistanceFlag', 'getDistanceFlag', 'setRankProportion', 'getRankProportion'],
    'ShapeTransformer': ['estimateTransformation', 'applyTransformation', 'warpImage'],
    'ThinPlateSplineShapeTransformer': ['create', 'setRegularizationParameter', 'getRegularizationParameter'],
    'AffineTransformer': ['create', 'setFullAffine', 'getFullAffine'],
}

# XFeatures2D module (SIFT, SURF, etc.)
xfeatures2d = {
    'SIFT': ['create', 'getDefaultName'],
    'SURF': ['create', 'setHessianThreshold', 'getHessianThreshold', 'setNOctaves', 'getNOctaves', 'setNOctaveLayers', 'getNOctaveLayers', 'setExtended', 'getExtended', 'setUpright', 'getUpright'],
    'BEBLID': ['create'],
    'TEBLID': ['create'],
    'LATCH': ['create'],
    'DAISY': ['create'],
    'VGG': ['create'],
    'BoostDesc': ['create'],
    'BriefDescriptorExtractor': ['create'],
    'FREAK': ['create'],
    'StarDetector': ['create'],
    'LUCID': ['create'],
    'HarrisLaplaceFeatureDetector': ['create'],
    'AffineFeature2D': ['create'],
}

# XImgProc module (superpixels, edge detection, filters)
ximgproc = {
    '': [
        'niBlackThreshold', 'thinning', 'anisotropicDiffusion',
        'dtFilter', 'guidedFilter', 'amFilter', 'jointBilateralFilter', 'bilateralTextureFilter', 'rollingGuidanceFilter',
        'FastHoughTransform', 'HoughPoint2Line',
        'PeiLinNormalization', 'fourierDescriptor', 'transformFD', 'contourSampling',
        'colorMatchTemplate',
        'GradientDericheX', 'GradientDericheY',
    ],
    'SuperpixelSLIC': ['getNumberOfSuperpixels', 'iterate', 'getLabels', 'getLabelContourMask', 'enforceLabelConnectivity'],
    'SuperpixelSEEDS': ['getNumberOfSuperpixels', 'iterate', 'getLabels', 'getLabelContourMask'],
    'SuperpixelLSC': ['getNumberOfSuperpixels', 'iterate', 'getLabels', 'getLabelContourMask', 'enforceLabelConnectivity'],
    'createSuperpixelSLIC': [],
    'createSuperpixelSEEDS': [],
    'createSuperpixelLSC': [],
    'EdgeDrawing': ['detectEdges', 'getEdgeImage', 'getGradientImage', 'detectLines', 'detectEllipses', 'getSegments', 'getSegmentIndicesOfLines'],
    'createEdgeDrawing': [],
    'FastLineDetector': ['detect', 'drawSegments'],
    'createFastLineDetector': [],
    'EdgeBoxes': ['getBoundingBoxes', 'getAlpha', 'setAlpha', 'getBeta', 'setBeta', 'getEta', 'setEta', 'getMinScore', 'setMinScore', 'getMaxBoxes', 'setMaxBoxes', 'getEdgeMinMag', 'setEdgeMinMag', 'getEdgeMergeThr', 'setEdgeMergeThr', 'getClusterMinMag', 'setClusterMinMag', 'getMaxAspectRatio', 'setMaxAspectRatio', 'getMinBoxArea', 'setMinBoxArea', 'getGamma', 'setGamma', 'getKappa', 'setKappa'],
    'createEdgeBoxes': [],
    'StructuredEdgeDetection': ['detectEdges', 'computeOrientation', 'edgesNms'],
    'createStructuredEdgeDetection': [],
    'FastGlobalSmootherFilter': ['filter', 'getLambda', 'getSigmaColor', 'getLambdaAttenuation', 'getNumIter'],
    'createFastGlobalSmootherFilter': [],
    'DisparityWLSFilter': ['filter', 'getConfidenceMap', 'getROI', 'setDepthDiscontinuityRadius', 'getDepthDiscontinuityRadius', 'setLRCthresh', 'getLRCthresh', 'setSigmaColor', 'getSigmaColor', 'setLambda', 'getLambda'],
    'createDisparityWLSFilter': [],
    'RidgeDetectionFilter': ['getRidgeFilteredImage'],
    'createRidgeDetectionFilter': [],
    'ScanSegment': ['iterate', 'getNumberOfSuperpixels', 'getLabels', 'getLabelContourMask'],
    'createScanSegment': [],
}

# XPhoto module
xphoto = {
    '': ['autowb', 'balanceWhite', 'dctDenoising', 'inpaint', 'oilPainting', 'bm3dDenoising'],
    'SimpleWB': ['setInputMax', 'getInputMax', 'setInputMin', 'getInputMin', 'setOutputMax', 'getOutputMax', 'setOutputMin', 'getOutputMin', 'setP', 'getP', 'balanceWhite'],
    'GrayworldWB': ['setSaturationThreshold', 'getSaturationThreshold', 'balanceWhite'],
    'LearningBasedWB': ['extractSimpleFeatures', 'setRangeMaxVal', 'getRangeMaxVal', 'setSaturationThreshold', 'getSaturationThreshold', 'setHistBinNum', 'getHistBinNum', 'balanceWhite'],
    'createSimpleWB': [],
    'createGrayworldWB': [],
    'createLearningBasedWB': [],
    'TonemapDurand': ['getSaturation', 'setSaturation', 'getContrast', 'setContrast', 'getSigmaSpace', 'setSigmaSpace', 'getSigmaColor', 'setSigmaColor'],
    'createTonemapDurand': [],
}

# Line Descriptor module
line_descriptor = {
    'BinaryDescriptor': ['createBinaryDescriptor', 'getNumOfOctaves', 'setNumOfOctaves', 'getWidthOfBand', 'setWidthOfBand', 'getReductionRatio', 'setReductionRatio', 'detect', 'compute', 'detectAndCompute'],
    'BinaryDescriptorMatcher': ['createBinaryDescriptorMatcher', 'match', 'knnMatch', 'radiusMatch'],
    'LSDDetector': ['createLSDDetector', 'detect'],
    'drawLineMatches': [],
}

# Saliency module
saliency = {
    'Saliency': ['computeSaliency'],
    'StaticSaliency': ['computeBinaryMap'],
    'StaticSaliencySpectralResidual': ['create'],
    'StaticSaliencyFineGrained': ['create'],
    'MotionSaliency': [],
    'MotionSaliencyBinWangApr2014': ['create', 'setImagesize', 'init', 'setImageWidth', 'setImageHeight', 'computeSaliency'],
    'Objectness': [],
    'ObjectnessBING': ['create', 'setTrainingPath', 'setBBResDir', 'getobjectnessValues', 'computeSaliency'],
}

# Tracking module
tracking = {
    'Tracker': ['init', 'update'],
    'TrackerKCF': ['create'],
    'TrackerKCF_Params': [],
    'TrackerCSRT': ['create', 'setInitialMask'],
    'TrackerCSRT_Params': [],
    'TrackerGOTURN': ['create'],
    'TrackerGOTURN_Params': [],
    'TrackerDaSiamRPN': ['create', 'getTrackingScore'],
    'TrackerDaSiamRPN_Params': [],
    'TrackerNano': ['create', 'getTrackingScore'],
    'TrackerNano_Params': [],
    'TrackerVit': ['create', 'getTrackingScore'],
    'TrackerVit_Params': [],
}

# Optical Flow module
optflow = {
    '': ['calcOpticalFlowSF', 'calcOpticalFlowSparseToDense', 'readOpticalFlow', 'writeOpticalFlow'],
    'DenseOpticalFlow': ['calc', 'collectGarbage'],
    'SparseOpticalFlow': ['calc'],
    'DualTVL1OpticalFlow': ['create', 'getTau', 'setTau', 'getLambda', 'setLambda', 'getTheta', 'setTheta', 'getGamma', 'setGamma', 'getEpsilon', 'setEpsilon', 'getScaleStep', 'setScaleStep', 'getScalesNumber', 'setScalesNumber', 'getWarpingsNumber', 'setWarpingsNumber', 'getInnerIterations', 'setInnerIterations', 'getOuterIterations', 'setOuterIterations', 'getMedianFiltering', 'setMedianFiltering', 'getUseInitialFlow', 'setUseInitialFlow'],
    'FarnebackOpticalFlow': ['create', 'getNumLevels', 'setNumLevels', 'getPyrScale', 'setPyrScale', 'getFastPyramids', 'setFastPyramids', 'getWinSize', 'setWinSize', 'getNumIters', 'setNumIters', 'getPolyN', 'setPolyN', 'getPolySigma', 'setPolySigma', 'getFlags', 'setFlags'],
    'SparsePyrLKOpticalFlow': ['create', 'getWinSize', 'setWinSize', 'getMaxLevel', 'setMaxLevel', 'getTermCriteria', 'setTermCriteria', 'getFlags', 'setFlags', 'getMinEigThreshold', 'setMinEigThreshold'],
    'VariationalRefinement': ['create', 'calcUV', 'getFixedPointIterations', 'setFixedPointIterations', 'getSorIterations', 'setSorIterations', 'getOmega', 'setOmega', 'getAlpha', 'setAlpha', 'getDelta', 'setDelta', 'getGamma', 'setGamma'],
    'DISOpticalFlow': ['create', 'getFinestScale', 'setFinestScale', 'getPatchSize', 'setPatchSize', 'getPatchStride', 'setPatchStride', 'getGradientDescentIterations', 'setGradientDescentIterations', 'getVariationalRefinementIterations', 'setVariationalRefinementIterations', 'getVariationalRefinementAlpha', 'setVariationalRefinementAlpha', 'getVariationalRefinementDelta', 'setVariationalRefinementDelta', 'getVariationalRefinementGamma', 'setVariationalRefinementGamma', 'getUseMeanNormalization', 'setUseMeanNormalization', 'getUseSpatialPropagation', 'setUseSpatialPropagation'],
    'RLOFOpticalFlowParameter': [],
    'DenseRLOFOpticalFlow': ['create', 'setRLOFOpticalFlowParameter', 'getRLOFOpticalFlowParameter', 'setForwardBackward', 'getForwardBackward', 'setGridStep', 'getGridStep', 'setInterpolation', 'getInterpolation', 'setEPICK', 'getEPICK', 'setEPICSigma', 'getEPICSigma', 'setEPICLambda', 'getEPICLambda', 'setRICSPSize', 'getRICSPSize', 'setRICSLICType', 'getRICSLICType', 'setUsePostProc', 'getUsePostProc', 'setFgsLambda', 'getFgsLambda', 'setFgsSigma', 'getFgsSigma', 'setUseVariationalRefinement', 'getUseVariationalRefinement'],
    'SparseRLOFOpticalFlow': ['create', 'setRLOFOpticalFlowParameter', 'getRLOFOpticalFlowParameter', 'setForwardBackward', 'getForwardBackward'],
}

# Background Segmentation module
bgsegm = {
    'BackgroundSubtractorMOG': ['apply', 'getBackgroundImage', 'getHistory', 'setHistory', 'getNMixtures', 'setNMixtures', 'getBackgroundRatio', 'setBackgroundRatio', 'getNoiseSigma', 'setNoiseSigma'],
    'BackgroundSubtractorGMG': ['apply', 'getBackgroundImage', 'getMaxFeatures', 'setMaxFeatures', 'getDefaultLearningRate', 'setDefaultLearningRate', 'getNumFrames', 'setNumFrames', 'getQuantizationLevels', 'setQuantizationLevels', 'getBackgroundPrior', 'setBackgroundPrior', 'getSmoothingRadius', 'setSmoothingRadius', 'getDecisionThreshold', 'setDecisionThreshold', 'getUpdateBackgroundModel', 'setUpdateBackgroundModel', 'getMinVal', 'setMinVal', 'getMaxVal', 'setMaxVal'],
    'BackgroundSubtractorCNT': ['apply', 'getBackgroundImage', 'getMinPixelStability', 'setMinPixelStability', 'getMaxPixelStability', 'setMaxPixelStability', 'getUseHistory', 'setUseHistory', 'getIsParallel', 'setIsParallel'],
    'BackgroundSubtractorLSBP': ['apply', 'getBackgroundImage'],
    'BackgroundSubtractorGSOC': ['apply', 'getBackgroundImage'],
    'createBackgroundSubtractorMOG': [],
    'createBackgroundSubtractorGMG': [],
    'createBackgroundSubtractorCNT': [],
    'createBackgroundSubtractorLSBP': [],
    'createBackgroundSubtractorGSOC': [],
    'createSyntheticSequenceGenerator': [],
}

# Face module
face = {
    'FaceRecognizer': ['train', 'update', 'predict', 'write', 'read', 'setLabelInfo', 'getLabelInfo', 'getLabelsByString', 'getThreshold', 'setThreshold'],
    'LBPHFaceRecognizer': ['create', 'getGridX', 'setGridX', 'getGridY', 'setGridY', 'getRadius', 'setRadius', 'getNeighbors', 'setNeighbors', 'getHistograms', 'getLabels'],
    'EigenFaceRecognizer': ['create', 'getNumComponents', 'setNumComponents', 'getEigenValues', 'getEigenVectors', 'getMean', 'getProjections'],
    'FisherFaceRecognizer': ['create', 'getNumComponents', 'setNumComponents', 'getEigenValues', 'getEigenVectors', 'getMean', 'getProjections'],
    'Facemark': ['loadModel', 'fit', 'setFaceDetector', 'getFaces'],
    'FacemarkLBF': ['create'],
    'FacemarkLBF_Params': [],
    'FacemarkAAM': ['create'],
    'FacemarkAAM_Params': [],
    'FacemarkKazemi': ['create', 'training', 'setFaceDetector', 'getFaces'],
    'BIF': ['create', 'getNumBands', 'getNumRotations', 'compute'],
    'MACE': ['create', 'salt', 'train', 'same', 'load'],
    'StandardCollector': ['create', 'getMinLabel', 'getMinDist', 'getResults'],
    'PredictCollector': ['init', 'collect'],
}

# DNN SuperRes module
dnn_superres = {
    'DnnSuperResImpl': ['create', 'readModel', 'setModel', 'setPreferableBackend', 'setPreferableTarget', 'upsample', 'upsampleMultioutput', 'getScale', 'getAlgorithm'],
}

# DNN Object Detection module
dnn_objdetect = {
    'InferBbox': ['InferBbox'],
}

# WeChat QRCode module
wechat_qrcode = {
    'WeChatQRCode': ['WeChatQRCode', 'detectAndDecode', 'getScaleFactor', 'setScaleFactor'],
}

# MCC (Macbeth Color Checker) module
mcc = {
    'CChecker': ['create', 'setTarget', 'getTarget', 'setBox', 'getBox', 'getChartsRGB', 'getChartsYCbCr', 'getCost', 'getCenter', 'setCenter', 'setChartsRGB', 'setChartsYCbCr', 'setCost'],
    'CCheckerDetector': ['create', 'setNet', 'process', 'getBestColorChecker', 'getListColorChecker'],
    'DetectorParameters': [],
    'CCheckerDraw': ['create', 'draw'],
    'ColorCorrectionModel': ['ColorCorrectionModel', 'run', 'getCCM', 'getLoss', 'get_src_rgbl', 'get_dst_rgbl', 'getMask', 'getWeights', 'setColorSpace', 'setCCM_TYPE', 'setDistance', 'setLinear', 'setLinearGamma', 'setLinearDegree', 'setSaturatedThreshold', 'setWeightsList', 'setWeightCoeff', 'setInitialMethod', 'setMaxCount', 'setEpsilon', 'infer'],
}

# Image Hash module
img_hash = {
    'ImgHashBase': ['compute', 'compare'],
    'AverageHash': ['create'],
    'PHash': ['create'],
    'MarrHildrethHash': ['create', 'getKernelSize', 'setKernelSize', 'getScale', 'setScale'],
    'RadialVarianceHash': ['create', 'getNumOfAngleLine', 'setNumOfAngleLine', 'getSigma', 'setSigma'],
    'BlockMeanHash': ['create', 'setMode', 'getMode', 'getMean'],
    'ColorMomentHash': ['create'],
    '': ['averageHash', 'pHash', 'marrHildrethHash', 'radialVarianceHash', 'blockMeanHash', 'colorMomentHash'],
}

# Quality module
quality = {
    'QualityBase': ['compute', 'getQualityMap', 'clear', 'empty'],
    'QualityMSE': ['create', 'compute'],
    'QualityPSNR': ['create', 'compute', 'getMaxPixelValue', 'setMaxPixelValue'],
    'QualitySSIM': ['create', 'compute'],
    'QualityGMSD': ['create', 'compute'],
    'QualityBRISQUE': ['create', 'compute', 'computeFeatures'],
}

# Bioinspired module
bioinspired = {
    'Retina': ['create', 'getInputSize', 'getOutputSize', 'setup', 'getParameters', 'write', 'setupOPLandIPLParvoChannel', 'setupIPLMagnoChannel', 'run', 'applyFastToneMapping', 'getParvo', 'getParvoRAW', 'getMagno', 'getMagnoRAW', 'getMagnoRAW', 'setColorSaturation', 'clearBuffers', 'activateMovingContoursProcessing', 'activateContoursProcessing'],
    'RetinaFastToneMapping': ['create', 'setup', 'applyFastToneMapping'],
    'TransientAreasSegmentationModule': ['create', 'getSize', 'setup', 'getParameters', 'write', 'run', 'getSegmentationPicture', 'clearAllBuffers'],
}

# Intensity Transform module
intensity_transform = {
    '': ['BIMEF', 'autoscaling', 'contrastStretching', 'gammaCorrection', 'logTransform'],
}

# Fuzzy module
fuzzy = {
    '': ['FT02D_FL_process', 'FT02D_FL_process_float', 'FT02D_process', 'FT02D_inverseFT', 'FT02D_iteration', 'FT02D_components', 'createKernel', 'createKernel1', 'filter', 'inpaint'],
}

# HFS (Hierarchical Feature Selection) module
hfs = {
    'HfsSegment': ['create', 'setSegEgbThresholdI', 'getSegEgbThresholdI', 'setSegEgbThresholdII', 'getSegEgbThresholdII', 'setMinRegionSizeI', 'getMinRegionSizeI', 'setMinRegionSizeII', 'getMinRegionSizeII', 'setSpatialWeight', 'getSpatialWeight', 'setSlicSpixelSize', 'getSlicSpixelSize', 'setNumSlicIter', 'getNumSlicIter', 'performSegmentGpu', 'performSegmentCpu'],
}

# Phase Unwrapping module
phase_unwrapping = {
    'HistogramPhaseUnwrapping': ['create', 'getInverseReliabilityMap', 'unwrapPhaseMap'],
    'HistogramPhaseUnwrapping_Params': [],
}

# Registration module
reg = {
    'Map': ['inverseMap', 'inverseWarp', 'compose', 'scale', 'warp'],
    'MapAffine': ['MapAffine', 'getLinTr', 'getShift'],
    'MapProjec': ['MapProjec', 'getProjTr'],
    'MapShift': ['MapShift', 'getShift'],
    'MapTypeCaster': [],
    'Mapper': ['calculate', 'getMap'],
    'MapperGradAffine': ['create'],
    'MapperGradEuclid': ['create'],
    'MapperGradProj': ['create'],
    'MapperGradShift': ['create'],
    'MapperGradSimilar': ['create'],
    'MapperPyramid': ['MapperPyramid', 'calculate', 'getMap', 'numLev', 'numIterPerScale'],
}

# Signal module
signal = {
    '': ['createIIRFilter', 'filtfilt'],
    'IIRFilter': ['apply'],
}

# Alpha Matting module
alphamat = {
    '': ['infoFlow'],
}

# Custom Calibration module
ccalib = {
    '': ['calibrateCamera', 'calibrateCameraCharuco'],
    'CustomPattern': ['create', 'setFeatureDetector', 'setDescriptorExtractor', 'setDescriptorMatcher', 'drawOrientation', 'findPattern', 'isInitialized', 'getPatternPoints', 'getPixelSize', 'calibrate'],
    'RandomPatternGenerator': ['RandomPatternGenerator', 'generatePattern'],
    'RandomPatternCornerFinder': ['RandomPatternCornerFinder', 'loadPattern', 'computeObjectImagePoints', 'computeObjectImagePointsForSingle', 'getObjectPoints', 'getImagePoints'],
    'MultiCameraCalibration': ['loadImages', 'initialize', 'optimizeExtrinsics', 'run', 'writeParameters'],
}

# Plot module
plot = {
    'Plot2d': ['create', 'setMinX', 'setMinY', 'setMaxX', 'setMaxY', 'setPlotLineWidth', 'setPlotBackgroundColor', 'setPlotAxisColor', 'setPlotGridColor', 'setPlotTextColor', 'setPlotLineColor', 'setNeedPlotLine', 'setPlotSize', 'setInvertOrientation', 'setPointIdxToPrint', 'setShowGrid', 'setShowText', 'setGridLinesNumber', 'render'],
}

# RAPID 3D Tracking module
rapid = {
    '': ['extractControlPoints', 'extractLineBundle', 'convertCorrespondencies', 'drawCorrespondencies', 'drawSearchLines', 'drawWireframe'],
    'Tracker': ['getK', 'setK', 'getRapid', 'setRapid', 'compute'],
    'Rapid': ['create'],
    'OLSTracker': ['create'],
    'GOSTracker': ['create'],
}

# Structured Light module
structured_light = {
    'StructuredLightPattern': ['generate', 'decode'],
    'GrayCodePattern': ['create', 'getNumberOfPatternImages', 'setWhiteThreshold', 'setBlackThreshold', 'getProjPixel'],
    'GrayCodePattern_Params': [],
    'SinusoidalPattern': ['create', 'computePhaseMap', 'computeDataModulationTerm', 'unwrapPhaseMap', 'findProCamMatches'],
    'SinusoidalPattern_Params': [],
}

# Surface Matching module
surface_matching = {
    'Pose3D': ['Pose3D', 'updatePose', 'updatePoseQuat', 'appendPose', 'printPose', 'clone', 'writePose', 'readPose'],
    'PoseCluster3D': ['PoseCluster3D', 'addPose', 'writePoseCluster', 'readPoseCluster'],
    'PPF3DDetector': ['PPF3DDetector', 'setSearchParams', 'trainModel', 'match'],
    'ICP': ['ICP', 'registerModelToScene'],
}

# Extended Object Detection module
xobjdetect = {
    'WBDetector': ['create', 'read', 'write', 'train', 'detect'],
}

# DPM (Deformable Parts Model) module
dpm = {
    'DPMDetector': ['create', 'isEmpty', 'detect', 'getClassNames', 'getClassCount'],
    'DPMDetector_ObjectDetection': [],
}

# SuperRes module
superres = {
    'SuperResolution': ['setInput', 'nextFrame', 'reset', 'collectGarbage', 'getScale', 'setScale', 'getIterations', 'setIterations', 'getTau', 'setTau', 'getLabmda', 'setLabmda', 'getAlpha', 'setAlpha', 'getKernelSize', 'setKernelSize', 'getBlurKernelSize', 'setBlurKernelSize', 'getBlurSigma', 'setBlurSigma', 'getTemporalAreaRadius', 'setTemporalAreaRadius', 'getOpticalFlow', 'setOpticalFlow'],
    'createSuperResolution_BTVL1': [],
    'createSuperResolution_BTVL1_CUDA': [],
    'DenseOpticalFlowExt': ['calc', 'collectGarbage'],
    'FarnebackOpticalFlow': ['create'],
    'DualTVL1OpticalFlow': ['create'],
    'BroxOpticalFlow': ['create'],
    'PyrLKOpticalFlow': ['create'],
}

white_list = makeWhiteList([
    core, imgproc, objdetect, video, dnn, features2d, photo, calib3d,
    # Contrib modules
    ml, stitching, shape, xfeatures2d, ximgproc, xphoto, line_descriptor, saliency,
    tracking, optflow, bgsegm, face, dnn_superres, dnn_objdetect, wechat_qrcode, mcc,
    img_hash, quality, bioinspired, intensity_transform, fuzzy, hfs, phase_unwrapping,
    reg, signal, alphamat, ccalib, plot, rapid, structured_light, surface_matching,
    xobjdetect, dpm, superres
])

# namespace_prefix_override['dnn'] = ''  # compatibility stuff (enabled by default)
# namespace_prefix_override['aruco'] = ''  # compatibility stuff (enabled by default)
