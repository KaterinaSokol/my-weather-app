
let dayOfWeek = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[dayOfWeek.getDay()];

let minutes = dayOfWeek.getMinutes();
if(minutes < 10){
    minutes = `0${minutes}`;
}
let hours = dayOfWeek.getHours();
if(hours <10){
    hours = `0${hours}`;
}
let changeInformation = document.querySelector("#date-time");
changeInformation.innerHTML = `${day}, ${hours}:${minutes}`;


function showWeather(response){
    let temperature = Math.round(response.data.main.temp);
    let description = (response.data.weather[0].description);
    let windSpeed = Math.round(response.data.wind.speed);
    let humidity = response.data.main.humidity;
    
    let windSpeedElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let descroptionElement = document.querySelector("h5");
    let temperatureElement = document.querySelector("#today");
    
    temperatureElement.innerHTML = `${temperature}°C`;
    descroptionElement.innerHTML = `${description}`;
    windSpeedElement.innerHTML = `Wind: ${windSpeed} km/h`;
    humidityElement.innerHTML = `Humidity: ${humidity} %`;

    document.querySelector("#city-name").innerHTML = response.data.name;
}

function searchCity(cityName){
    let apiKey = "e7dbb1a7cbf271831b301595cd51d95b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);

}


function ourSubmit(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-text");
    let cityName = cityInput.value;
    searchCity(cityName);
    
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", ourSubmit);

searchCity("Kharkiv");

function myPosition(position) {
    let apiKey = "e7dbb1a7cbf271831b301595cd51d95b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(showWeather);
  }

function currentPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(myPosition);
}

let currentButton = document.querySelector("#button-current");
currentButton.addEventListener("click", currentPosition);