import { getWeather } from "./app.js";
import { getCity } from "./app.js";
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  details.innerHTML = `
          <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
          `;

  let imageBasedOnTimeofDay = null;
  if (weather.IsDayTime) {
    imageBasedOnTimeofDay = "img/day.svg";
  } else {
    imageBasedOnTimeofDay = "img/night.svg";
  }
  time.setAttribute("src", imageBasedOnTimeofDay);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const fetchCityAndWeatherDetails = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
};

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  fetchCityAndWeatherDetails(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
