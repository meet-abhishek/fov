

const calculateFov = (event) => {
    event.preventDefault();

    const focalLength = parseFloat(document.getElementById('focalLength').value || 50);
    const distance = parseFloat(document.getElementById('distance').value) || 3;
    const sensorWidth = parseFloat(document.getElementById('sensorWidth').value || 35.9);
    const sensorHeight = parseFloat(document.getElementById('sensorHeight').value || 24.0);

    if (isNaN(focalLength) || isNaN(distance) || isNaN(sensorWidth) || isNaN(sensorHeight) || 
        focalLength <= 0 || distance <= 0 || sensorWidth <= 0 || sensorHeight <= 0) {
        alert('All parameters must be positive numbers.');
        return;
    }

    const sensorDiagonal = Math.sqrt(sensorWidth ** 2 + sensorHeight ** 2);
    const horizontalFOV = 2 * distance * Math.tan(Math.atan(sensorWidth / (2 * focalLength)) / 2);
    const verticalFOV = 2 * distance * Math.tan(Math.atan(sensorHeight / (2 * focalLength)) / 2);
    const diagonalFOV = 2 * distance * Math.tan(Math.atan(sensorDiagonal / (2 * focalLength)) / 2);

    document.getElementById('result').innerHTML = `

        
        <div >
            <div class="card-body text-white">
                <h5 class="card-text"><strong>Horizontal FOV: ${horizontalFOV.toFixed(2)} m</strong></h5>
                <h5 class="card-text"><strong>Vertical FOV: ${verticalFOV.toFixed(2)} m</strong></h5>
                <h5 class="card-text"><strong>Diagonal FOV: ${diagonalFOV.toFixed(2)} m</strong></h5>
            </div>
        </div>
       
    `;
}

document.getElementById('fovform').addEventListener('submit', calculateFov);
