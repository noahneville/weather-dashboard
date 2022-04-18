var apiKey = "56441d601f3ab1f99b347d66b6005856";

const citySearch = document.querySelector("#search-city");
const cityInput = document.querySelector("#cityInput");
const cityEl = document.querySelector("#city-name");
const dateEl = document.querySelector(".dateArea");
const currentIconEl = document.querySelector(".iconArea");
const currentTempEl = document.querySelector(".tempArea");
const currentHumidEl = document.querySelector(".humidArea");
const currentWindEl = document.querySelector(".windArea");
const currentUVEl = document.querySelector(".uvArea");
const todayContainer = document.querySelector(".today-weather");
const forecastContainer = document.querySelector("#forecastContainer");

async function getWeatherData(city) {
  cityEl.textContent = city;

  const weatherURL = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=56441d601f3ab1f99b347d66b6005856");
  var coordinates = await weatherURL.json();

  var lat = coordinates.coord.lat;
  var lon = coordinates.coord.lon;

  const requestURL = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey);
  var weatherObject = await requestURL.json();

  console.log(weatherObject);

  renderToday(weatherObject);
  getForecast(weatherObject);
}

// function getForecast(data) {
  
//   for (let index = 1; index < 6; index++) {
//     forecastContainer.textContent = " ";
//     renderForecast(data.daily[index]);
//   }
// }

function renderToday(data) {
  let todayObject = data;
  let iconCode = todayObject.current.weather[0].icon;
  console.log(iconCode);
  let unixDate = todayObject.current.dt;
  console.log(unixDate);
  dateEl.textContent = moment.unix(unixDate).format("dddd, MMMM Do, YYYY");
  console.log(dateEl);
  currentIconEl.setAttribute( "src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
  currentTempEl.textContent = "Temperature: " + Math.round(todayObject.current.temp) + "°F";
  currentWindEl.textContent = "Wind: " + todayObject.current.wind_speed + "MPH";
  currentHumidEl.textContent = "Humidity: " + todayObject.current.humidity + "%";
  console.log(currentHumidEl);
  currentUVEl.textContent = todayObject.current.uvi;

  if (todayObject.current.uvi < 3) {
    currentUVEl.classList.add("low-UV");
  } else if (todayObject.current.uvi >= 3 && todayObject.current.uvi < 8) {
    currentUVEl.classList.add("mod-UV");
  } else {
    currentUVEl.classList.add("high-UV");
  }


}

// need date, icon, temp, wind, humidity
// function renderForecast(data) {
//   let unixDate = data.dt;
//   console.log(unixDate);
//   let iconCode = data.weather[0].icon;
//   let cardIndex = 1;
//   let forecastCard = document.querySelector(".forecast-" + cardIndex);
//   console.log(forecastCard);

//   let forecastDate = document.createElement("p");
//   forecastDate.textContent = moment.unix(unixDate).format("MM/DD/YY");
//   console.log(forecastDate);
//     forecastCard.appendChild(forecastDate);

//   let forecastIcon = document.createElement("img");
//   forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");
//   forecastCard.appendChild(forecastIcon);

//   let forecastTemp = document.createElement("p");
//   forecastTemp.textContent = "Temperature: " + Math.round(data.temp.day) + "°F";
//   forecastCard.appendChild(forecastTemp);

//   let forecastWind = document.createElement("p");
//   forecastWind.textContent = data.wind_speed + "MPH";
//   forecastCard.appendChild(forecastWind);

//   let forecastHumid = document.createElement("p");
//   forecastHumid.textContent = data.humidity + "%";
//   forecastCard.appendChild(forecastHumid);

//   cardIndex++;
// }

function getForecast(data) {
  for (let i = 1; i < 6; i++) {
    let forecastCard = document.querySelector(`.forecast-${i}`);
    console.log(forecastCard);
    let forecastData = data.daily[i];
    
    let forecastDate = document.createElement("p");
    forecastDate.textContent = moment.unix(forecastData.dt).format("MM/DD/YY");
    console.log(forecastDate);

    let forecastIcon = document.createElement("img");
    forecastIcon.setAttribute("src", `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png`);
    
    let forecastTemp = document.createElement("p");
    forecastTemp.textContent = "Temperature: " + Math.round(forecastData.temp.day) + "°F";

    let forecastWind = document.createElement("p");
    forecastWind.textContent = forecastData.wind_speed + "MPH";

    let forecastHumid = document.createElement("p");
    forecastHumid.textContent = forecastData.humidity + "%";
    
    forecastCard.appendChild(forecastDate);
    forecastCard.appendChild(forecastIcon);
    forecastCard.appendChild(forecastTemp);
    forecastCard.appendChild(forecastWind);
    forecastCard.appendChild(forecastHumid);
  }
}

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();
    console.log(city);
    if (city) {
        //todayContainer.textContent = "";
        getWeatherData(city);
       

    } else {
        alert("Please search for a city");
    }
};

citySearch.addEventListener("submit", formSubmitHandler);
