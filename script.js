// Define sensor sizes for predefined sensors
const sensorSizes = {
  fullFrame: { width: 35.9, height: 24.0 },
  cropSensor: { width: 22.3, height: 14.9 }, // Example APS-C size (varies by manufacturer)
  microFourThirds: { width: 17.3, height: 13.0 } // Example Micro Four Thirds size
};

// Dynamically populate the sensor dropdown list
const sensorSelect = document.getElementById("sensorSelect");
Object.keys(sensorSizes).forEach(sensorKey => {
  const option = document.createElement("option");
  option.value = sensorKey;
  option.textContent = sensorKey.replace(/([A-Z])/g, ' $1').toUpperCase(); // Format the name (e.g., cropSensor => Crop Sensor)
  sensorSelect.appendChild(option);
});

// Handle camera sensor selection
sensorSelect.addEventListener("change", function () {
  const selectedSensor = this.value;
  if (selectedSensor) {
    const sensor = sensorSizes[selectedSensor];
    document.getElementById("sensorWidth").value = sensor.width;
    document.getElementById("sensorHeight").value = sensor.height;
  } else {
    // If no sensor selected, allow manual input or default to full-frame
    document.getElementById("sensorWidth").value = 35.9;
    document.getElementById("sensorHeight").value = 24.0;
  }
});

// Calculate FOV based on user input
const calculateFov = (event) => {
  event.preventDefault();

  const focalLength = parseFloat(document.getElementById("focalLength").value || 50);
  const distance = parseFloat(document.getElementById("distance").value) || 3;
  const sensorWidth = parseFloat(document.getElementById("sensorWidth").value || 35.9);
  const sensorHeight = parseFloat(document.getElementById("sensorHeight").value || 24.0);

  if (
    isNaN(focalLength) ||
    isNaN(distance) ||
    isNaN(sensorWidth) ||
    isNaN(sensorHeight) ||
    focalLength <= 0 ||
    distance <= 0 ||
    sensorWidth <= 0 ||
    sensorHeight <= 0
  ) {
    alert("All parameters must be positive numbers.");
    return;
  }

  const sensorDiagonal = Math.sqrt(sensorWidth ** 2 + sensorHeight ** 2);

  const horizontalFOV =
    2 * distance * Math.tan(Math.atan(sensorWidth / (2 * focalLength)));
  const verticalFOV =
    2 * distance * Math.tan(Math.atan(sensorHeight / (2 * focalLength)));
  const diagonalFOV =
    2 * distance * Math.tan(Math.atan(sensorDiagonal / (2 * focalLength)));

  document.getElementById("result").innerHTML = `
        <div>
            <div class="card-body text-white">
                <h5 class="card-text"><strong>Horizontal FOV: ${horizontalFOV.toFixed(2)} m</strong></h5>
                <h5 class="card-text"><strong>Vertical FOV: ${verticalFOV.toFixed(2)} m</strong></h5>
                <h5 class="card-text"><strong>Diagonal FOV: ${diagonalFOV.toFixed(2)} m</strong></h5>
            </div>
        </div>
    `;
};

document.getElementById("fovform").addEventListener("submit", calculateFov);
