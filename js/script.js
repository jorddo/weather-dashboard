// global variables
const searchCity = document.querySelector('.txt');
const searchButton = document.querySelector('.search-btn');
const date = document.querySelector('.date');
const currentCity = document.querySelector('#current-city');
const currentIcon = document.querySelector('#current-icon');
const currentTemp = document.querySelector('#current-temp');
const currentWind = document.querySelector('#current-wind');
const currentHumidity = document.querySelector('#current-humidity');
const currentUVI = document.querySelector('#current-uvi');
const apiKey = '5487746d0675bbfe431f4c709399c088';
const currentDate = moment().format('MMM Do, YYYY');

// write date to page
date.innerHTML = currentDate;

// enter key submits text area
searchCity.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
  }
});

function storeSearch() {
  const arr = [];

  for (let i = 0; i < searchCity.length; i++) {
    arr.push(searchCity[i].value);
  }

  localStorage.setItem('search', JSON.stringify(arr));
}

function currentWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=imperial
  `)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentData) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&exclude={part}&units=imperial&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (fiveDayData) {
          // writing city name to page
          currentCity.textContent = searchCity.value;

          // writing current values to current weather box
          currentIcon.src = `http://openweathermap.org/img/wn/${fiveDayData.daily[0].weather[0].icon}@2x.png`;
          currentTemp.textContent = `Temp: ${Math.round(
            fiveDayData.daily[0].temp.day
          )}\u00b0`;
          currentWind.textContent = `Wind: ${fiveDayData.daily[0].wind_speed} MPH`;
          currentHumidity.textContent = `Humidity: ${fiveDayData.daily[0].humidity}`;
          currentUVI.textContent = `UV Index: ${fiveDayData.daily[0].uvi}`;

          // writing values to 5 day forecast cards
          const cards = document.querySelectorAll('.card');

          for (let i = 1; i < cards.length + 1; i++) {
            const cardIcon = cards[i - 1].querySelector('img');
            const cardDate = cards[i - 1].querySelector('.card-date');
            const cardTemp = cards[i - 1].querySelector('.card-temp');
            const cardWind = cards[i - 1].querySelector('.card-wind');
            const cardHumidity = cards[i - 1].querySelector('.card-humidity');
            cardDate.textContent = moment(fiveDayData.daily[i].dt, 'X').format(
              'MM/DD/YYYY'
            );
            cardIcon.src = `http://openweathermap.org/img/wn/${fiveDayData.daily[i].weather[0].icon}@2x.png`;
            cardTemp.textContent = `Temp: ${Math.round(
              fiveDayData.daily[i].temp.day
            )}\u00b0`;
            cardWind.textContent = `Wind: ${fiveDayData.daily[i].wind_speed} MPH`;
            cardHumidity.textContent = `Humidity: ${fiveDayData.daily[i].humidity}`;
          }
        });
    });
}
searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  currentWeather();
  storeSearch();
});
