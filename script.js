document.addEventListener("DOMContentLoaded", () => {
    fetchCountryData();
});

// Fetch country data from Rest Countries API
function fetchCountryData() {
    const apiUrl = "https://restcountries.com/v3.1/all";

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayCountryData(data);
        })
        .catch((error) => console.error("Error fetching country data:", error));
}

function displayCountryData(countryData) {

    // Container Div created and appended to Body
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container");
    document.body.appendChild(containerDiv);

    // Title is added to the Page
    const titleText = "Rest Countries and Weather using fetch API";
    const title = document.createElement("h1");
    title.id = "title";
    title.classList.add("text-center");
    title.textContent = titleText;

    containerDiv.appendChild(title);

    // Card Row created and appended to Container Div
    const cardRow = document.createElement("div");
    cardRow.classList.add("row");
    containerDiv.appendChild(cardRow);

    // Selecting 3 random countries to display on cards
    const randomIndices = getRandomIndices(countryData.length, 3);

    randomIndices.forEach((index) => {
        const data = countryData[index];
        const countryName = data.name.common;
        const flagImage = data.flags.png;
        const capital = data.capital ? data.capital[0] : "N/A";
        const region = data.region ? data.region : "N/A";
        const countryCode = data.cca3;
        const population = data.population ? data.population : "N/A";

        createCard(countryName, flagImage, capital, region, countryCode, population);
    });
}

function getRandomIndices(maxRange, count) {
    const indices = [];
    while (indices.length < count) {
        const randomIndex = Math.floor(Math.random() * maxRange);
        if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }
    return indices;
}

function createCard(countryName, flagImage, capital, region, countryCode, population) {

    const cardRow = document.querySelector(".row");

    // Card Column created and appended to Card Row
    const cardColumn = document.createElement("div");
    cardColumn.classList.add("col-xl-4", "col-lg-4", "col-md-4", "col-sm-6", "mb-3");

    // Card created and appended to Card Column
    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    // Card Header
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "text-center", "h4");
    cardHeader.textContent = countryName;

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center");

    const img = document.createElement("img");
    img.src = flagImage;
    img.classList.add("card-img-top", "img-fluid", "mb-3");
    img.style.maxHeight = "150px";
    img.style.objectFit = "cover";

    // Card Text
    const cardTextDiv = document.createElement("div");
    cardTextDiv.classList.add("card-text");
    
    const capitalPara = createParagraph("Capital:", capital);
    const regionPara = createParagraph("Region:", region);
    const countryCodePara = createParagraph("Country Code:", countryCode);
    const populationPara = createParagraph("Population:", population);

    // Weather Button
    const weatherButton = document.createElement("button");
    weatherButton.classList.add("btn", "btn-primary");
    weatherButton.textContent = "Click for Weather";

    //By creating an Event Listener, Weather Report is fetched and displayed via alert box
    weatherButton.addEventListener("click", () => {
        fetchWeatherData(countryName);
    });

    cardBody.appendChild(img);
    cardBody.appendChild(cardTextDiv);
    cardTextDiv.appendChild(capitalPara);
    cardTextDiv.appendChild(populationPara);
    cardTextDiv.appendChild(regionPara);
    cardTextDiv.appendChild(countryCodePara);

    cardBody.appendChild(weatherButton);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    cardColumn.appendChild(card);

    cardRow.appendChild(cardColumn);
}

// Create function for paragraph tag to add country details
function createParagraph(label, text) {
    const para = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${label} `;
    para.appendChild(strong);
    para.appendChild(document.createTextNode(text));
    return para;
}

// Fetch weather data from Open Weather API
function fetchWeatherData(countryName) {
    const apiKey = "4831fbf84200d0ac1172214b0cf0c22c"; // API Key from Open Weather Website to authorize and provide weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Weather data not available for the specified country.");
            }
            return response.json();
        })
        .then((data) => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const weatherInfo = `Weather: ${weatherDescription}, Temperature: ${temperature} °C`;

            alert(weatherInfo);
        })
        .catch((error) => console.error("Error fetching weather data:", error.message));
}
