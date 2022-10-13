// API URL
const count = 10;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

// Get Images from NASA API
async function getNasaImages() {
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        console.log(resultsArray);
    } catch (error) {
        // Catch Error Here
    }
}

// On Load
getNasaImages();