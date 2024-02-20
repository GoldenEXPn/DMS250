document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});




// For creating interactive map
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map on the "workMap" div with a given center and zoom level
    var workMap = L.map('workMap').setView([43.128455791762335, -77.62891817250541], 13);

    // Add a tile layer to add to our map, in this case, OpenStreetMap's Standard tile layer
    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    osm.addTo(workMap);

    // Add markers for a given location
    L.marker([43.12853910546242, -77.63097405396769]).addTo(workMap) // Replace with your coordinates
        .bindPopup('DMST250--Student') // Replace with your content
        .openPopup();
    L.marker([43.12867781766397, -77.63012965280903]).addTo(workMap)
        .bindPopup('DMS200W--Student')
        .openPopup();
    L.marker([43.12673719039349, -77.62894552519072]).addTo(workMap)
        .bindPopup('MATH164--Student')
        .openPopup();
    L.marker([43.12773368916784, -77.62914434363684]).addTo(workMap)
        .bindPopup('CSC280--Student')
        .openPopup();
    L.marker([43.128455791762335, -77.62891817250541]).addTo(workMap)
        .bindPopup('STAT213--Teaching Assistant')
        .openPopup();
});




// For plotting screen time line chart
document.addEventListener('DOMContentLoaded', function() {
    fetch('../screen_time.csv')
        .then(response => response.text())
        .then(csvString => {
            // Parse the CSV into a format that Chart.js can understand
            const data = Papa.parse(csvString, { header: true, skipEmptyLines: true }).data;
            const labels = Object.keys(data[0]).slice(1); // Get all keys except the first one, which is assumed to be the app name
            
            // Create datasets for each app
            const datasets = data.map(appData => {
                // Use the first entry as the label (application name)
                const label = appData[Object.keys(appData)[0]];
                // Map through each key (date) and get the corresponding screen time value
                const data = Object.keys(appData).slice(1).map(date => parseFloat(appData[date]));
                
                return {
                    label: label,
                    data: data,
                    fill: false,
                    borderColor: getRandomColor(), // Function to get a random color for each dataset
                };
            });

            // Initialize the Chart.js chart
            const ctx = document.getElementById('screenTimeChart').getContext('2d');
            const screenTimeChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching or parsing data:', error));
});

// Function to generate random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



 