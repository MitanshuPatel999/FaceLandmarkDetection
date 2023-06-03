const video = document.getElementById('inputVideo');
const canvas = document.getElementById('overlay');


(async () => {
  const MODEL_URL = '/models';
  // await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
  await  faceapi.loadTinyFaceDetectorModel(MODEL_URL)
  await faceapi.loadFaceLandmarkModel(MODEL_URL)
  await faceapi.loadFaceRecognitionModel(MODEL_URL)
  await faceapi.loadFaceExpressionModel(MODEL_URL)
  const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
  video.srcObject = stream;
})();


async function onPlay() {


  let fullFaceDescriptions = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    // .withFaceDescriptors()
    .withFaceExpressions();

  const dims = faceapi.matchDimensions(canvas, video, true);
  const detectionsWithLandmarksForSize = faceapi.resizeResults(fullFaceDescriptions, dims)
  // draw them into a canvas
  canvas.width = video.width
  canvas.height = video.height
  // faceapi.drawLandmarks(canvas, detectionsWithLandmarksForSize, { drawLines: true })
    
  faceapi.draw.drawDetections(canvas, detectionsWithLandmarksForSize);
  faceapi.draw.drawFaceLandmarks(canvas, detectionsWithLandmarksForSize, { drawLines: true });
  faceapi.draw.drawFaceExpressions(canvas, detectionsWithLandmarksForSize);

  setTimeout(() => onPlay(), 100)

}
