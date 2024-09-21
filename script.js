// Function to get color based on carbon intensity (in hex)
function getColor(carbonIntensity) {
    if (carbonIntensity <= 100) return '#36a664';
    if (carbonIntensity <= 200) return '#bdd255';
    if (carbonIntensity <= 300) return '#ebd749';
    if (carbonIntensity <= 400) return '#d9b341';
    if (carbonIntensity <= 500) return '#c18637';
    if (carbonIntensity <= 600) return '#b06730';
    if (carbonIntensity <= 700) return '#914a25';
    if (carbonIntensity <= 800) return '#682f14';
    if (carbonIntensity <= 900) return '#4d2509';
    return '#381c01'; // Default for higher values
}

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Function to update carbon intensity and background color
function updateData() {
    fetch('https://api.electricitymap.org/v3/carbon-intensity/latest?zone=AU-NSW', {
        headers: {
            'Authorization': `auth-token 4Tv1z6WL17Mn3DZbih14kOTy` // Replace with your actual API key
        }
    })
    .then(response => response.json())
    .then(data => {
        const carbonIntensity = data.carbonIntensity;
        const color = getColor(carbonIntensity);

        // Convert the hex color to rgba with 30% transparency
        const containerColor = hexToRgba(color, 0.8); // This applies the 30% transparency

        // Set the background color of the entire container with transparency
        document.getElementById('demo-container').style.backgroundColor = containerColor;

        // Set the circle color without transparency
        const circle = document.getElementById('carbon-intensity-circle');
        circle.style.backgroundColor = color;
        
        // Update the circle text for value and unit
        document.querySelector('.intensity-circle .value').textContent = carbonIntensity;
        document.querySelector('.intensity-circle .unit').textContent = 'gCO₂eq/kWh';

        // Set the border color and box-shadow of the circle to match the intensity color
        circle.style.borderColor = color;
        circle.style.boxShadow = `0 0 15px 5px rgba(111, 110, 110, 0.4)`; // Ensure the smoky effect is constant
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Call the function to update data on page load
window.onload = updateData;
