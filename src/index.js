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
  let cityTemp = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let dateElement = setDateTime(response.data.time * 1000);
  let description = response.data.condition.description;

  let currentTemperature = document.querySelector("#todayWeather strong");
  let citySearched = document.querySelector("#city");
  let todayDate = document.querySelector("#todayDate");
  let weatherDescription = document.querySelector("#description");

  currentTemperature.innerHTML = `${cityTemp}`;
  citySearched.innerHTML = `${city}`;
  todayDate.innerHTML = dateElement;
  weatherDescription.innerHTML = description;
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(setCurrentLocation);
}

function setCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

let apiKey = "8b1e3171fc9032a9t40o6647047da630";

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", setCity);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getLocation);
