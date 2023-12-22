// Access webcam
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    document.getElementById("webcam").srcObject = stream;
  })
  .catch((err) => {
    console.error("Error accessing webcam: " + err);
  });

// WebSocket setup for receiving name
const socket = new WebSocket("ws://localhost:3000");

socket.onmessage = function (event) {
  document.getElementById("name").textContent = event.data;
};

// accessing

socket.onmessage = function (event) {
  const nameElement = document.getElementById("name");
  nameElement.textContent = event.data;

  // Remove the class if it's already there to restart the animation
  nameElement.classList.remove("animate-name");

  // Trigger a reflow, necessary to restart the animation
  void nameElement.offsetWidth;

  // Add the class back to start the animation
  nameElement.classList.add("animate-name");
};

// Screenshot
document
  .getElementById("screenshotButton")
  .addEventListener("click", captureScreenshot);

function captureScreenshot() {
  html2canvas(document.body)
    .then((canvas) => {
      // Create an image of the canvas
      var image = canvas.toDataURL("image/png");

      // You can then download or display the image as needed
      downloadImage(image, "screenshot.png");
    })
    .catch((error) => {
      console.error("Error capturing screenshot:", error);
    });
}

function downloadImage(data, filename) {
  var a = document.createElement("a");
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a); // Clean up to remove the temporary link
}
