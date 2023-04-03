function setDateTime(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let timeHr = now.getHours();
  if (timeHr < 10) {
    timeHr = `0${timeHr}`;
  }
  let timeMin = now.getMinutes();
  if (timeMin < 10) {
    timeMin = `0${timeMin}`;
  }
  let today = `${currentDay} ${timeHr}:${timeMin}`;
  return today;
}

function setCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#citySearch");
  setApi(citySearch.value);
}

function setApi(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  fahrenheit = response.data.temperature.current;
  let cityTemp = Math.round(fahrenheit);
  let city = response.data.city;
  let dateElement = setDateTime(response.data.time * 1000);
  let description = response.data.condition.description;
  let wind = response.data.wind.speed;
  let iconUrl = response.data.condition.icon_url;
  let iconAlt = response.data.condition.icon;

  let currentTemperature = document.querySelector("#todayTemp");
  let citySearched = document.querySelector("#city");
  let todayDate = document.querySelector("#todayDate");
  let weatherDescription = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  currentTemperature.innerHTML = `${cityTemp}`;
  citySearched.innerHTML = `${city}`;
  todayDate.innerHTML = dateElement;
  weatherDescription.innerHTML = description;
  windSpeed.innerHTML = wind;
  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", iconAlt);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(setCurrentLocation);
}

function setCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${long}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
  console.log(lat);
}

function calculateCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#todayTemp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusValue = ((fahrenheit - 32) * 5) / 9;
  currentTemperature.innerHTML = Math.round(celsiusValue);
}

function calculateFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#todayTemp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  currentTemperature.innerHTML = Math.round(fahrenheit);
}

let apiKey = "8b1e3171fc9032a9t40o6647047da630";

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", calculateCelsius);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", calculateFahrenheit);

let fahrenheit = null;

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", setCity);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getLocation);

setApi("New York City");
