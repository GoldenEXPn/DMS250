document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    // Add your JavaScript code here
});

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
