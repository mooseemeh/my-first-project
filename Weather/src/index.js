function setDateTime() {
  let now = new Date();
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

let todayDate = document.querySelector("#todayDate");
todayDate.innerHTML = setDateTime();

function setCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#citySearch");
  //console.log(citySearch.value);
  let city = document.querySelector("#city");
  city.innerHTML = citySearch.value;
  setApi(citySearch.value);
}

function setApi(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let currentWeather = document.querySelector("#todayWeather");
  currentWeather.innerHTML = `${cityTemp}°F`;
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(setCurrentLocation);
}

function setCurrentLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getCity);
}

function getCity(response) {
  let currentCity = response.data.name;
  let city = document.querySelector("#city");
  city.innerHTML = currentCity;
  setApi(currentCity);
}

let apiKey = "667d9f573c8af4c33457be5d561a9148";

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", setCity);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getLocation);
