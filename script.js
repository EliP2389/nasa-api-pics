const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imageContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// API URL
const count = 10;
const apiKey = "DEMO_KEY";
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

// Update DOM
updateDOM = () => {
  resultsArray.forEach((result) => {
    // Card Containers
    const card = document.createElement("div");
    card.classList.add("card");
    // Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add To Favorites";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    // Card Text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = result.date;
    // Copyright
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imageContainer.appendChild(card);
  });
};

// Get Images from NASA API
async function getNasaImages() {
  try {
    const response = await fetch(apiURL);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM();
  } catch (error) {
    // Catch Error Here
  }
}

// Add result to favorites
saveFavorite = (itemUrl) => {
  // Loop through Results array to select favorites
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      console.log(favorites);
    // Show save Confirmation for 2 seconds
    saveConfirmed.hidden = false;
    setTimeout(() => {
        saveConfirmed.hidden = true;
    }, 2000);
    }
  });
};

// On Load
getNasaImages();
