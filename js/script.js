// global variables
const searchCity = document.querySelector('.txt');
const searchButton = document.querySelector('.search-btn');
const date = document.querySelector('.date');
const currentCity = document.querySelector('#current-city');
const currentTemp = document.querySelector('#current-temp');
const currentWind = document.querySelector('#current-wind');
const currentHumidity = document.querySelector('#current-humidity');
const currentUVI = document.querySelector('#current-uvi');
const apiKey = '5487746d0675bbfe431f4c709399c088';
const currentDate = moment().format('MMM Do, YYYY');

// write date to page
date.innerHTML = currentDate;

function currentWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=imperial
  `)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentData) {
      console.log(currentData);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&exclude={part}&units=imperial&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (fiveDayData) {
          console.log(fiveDayData);
          console.log(
            moment(fiveDayData.daily[0].dt, 'X').format('MM/DD/YYYY')
          );
          console.log(
            `http://openweathermap.org/img/wn/${fiveDayData.daily[0].weather[0].icon}@2x.png`
          );
          console.log(fiveDayData.daily[0].temp.day);
          console.log(fiveDayData.daily[0].wind_speed);
          console.log(fiveDayData.daily[0].humidity);
          console.log(fiveDayData.daily[0].uvi);

          // writing city name to page
          currentCity.textContent = searchCity.value;

          // writing current values to current weather box

          currentTemp.textContent = `Temp: ${Math.round(
            fiveDayData.daily[0].temp.day
          )}\u00b0`;
          currentWind.textContent = `Wind: ${fiveDayData.daily[0].wind_speed} MPH`;
          currentHumidity.textContent = `Humidity: ${fiveDayData.daily[0].humidity}`;
          currentUVI.textContent = `UV Index: ${fiveDayData.daily[0].uvi}`;
        });
    });
}
searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  currentWeather();
});
