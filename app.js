let months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

let search_button = document.getElementById("search_button");
let icon = document.createElement("img");
let temp = document.createElement("h1");
let days_container = document.querySelector(".container");

search_button.onclick = () => {
  let search_input = document.getElementById("search_input").value;
  let location_string = search_input.replaceAll(" ", "%20");
  get_location(location_string);
};

const get_location = (loc) => {
  fetch(
    `https://ai-weather-by-meteosource.p.rapidapi.com/find_places?text=${loc}&language=en`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      document.querySelector(".place_container").innerHTML = " ";
      document.querySelector(
        ".place_container"
      ).innerHTML += `<h3>${response[0].name}, ${response[0].adm_area2}</h3>`;
      get_current_weather(response[0].lat, response[0].lon);
      get_forecast(response[0].lat, response[0].lon);
    })
    .catch((err) => console.error(err));
};

const get_current_weather = (lat, long) => {
  fetch(
    `https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${lat}&lon=${long}&timezone=auto&language=en&units=auto`,
    options
  )
    .then((response) => response.json())
    .then((response) => display_current(response.current))
    .catch((err) => console.error(err));
};

const display_current = (data) => {
  // DISPLAY CURRENT ICON
  let icon_container = document.querySelector(".icon");

  icon_container.innerHTML = " ";
  icon.src = `weather_icons/${data.icon_num}.png`;
  icon_container.appendChild(icon);

  document.querySelector(".icon_desc").innerHTML = " ";
  document.querySelector(".icon_desc").innerHTML += `<h4>${data.summary}</h4>`;

  // DISPLAY TEMPERATURE
  let temperature_container = document.querySelector(".temperature");
  temperature_container.innerHTML = " ";
  temp.textContent = `${data.temperature}°C`;
  temperature_container.appendChild(temp);

  document.querySelector(".tmp").innerHTML = " ";
  document.querySelector(".tmp").innerHTML += "<h4>Temperature</h4>";

  // DISPLAY MORE INFOS
  document.querySelector(".values_container").innerHTML = " ";
  document.querySelector(
    ".values_container"
  ).innerHTML += `<h3>${data.humidity}%</h3>`;
  document.querySelector(
    ".values_container"
  ).innerHTML += `<h3>${data.cloud_cover}%</h3>`;
  document.querySelector(
    ".values_container"
  ).innerHTML += `<h3>${data.wind_chill}°C</h3>`;
};

const get_forecast = (lat, long) => {
  fetch(
    `https://ai-weather-by-meteosource.p.rapidapi.com/daily?lat=${lat}&lon=${long}&language=en&units=ca`,
    options
  )
    .then((response) => response.json())
    .then((response) => display_forecast(response.daily.data))
    .catch((err) => console.error(err));
};

const display_forecast = (daily_data) => {
  days_container.innerHTML = "";

  for (let i = 1; i < 8; i++) {
    let n_month = parseInt(get_month(daily_data[i].day));
    let month = months[n_month];
    let day = get_day(daily_data[i].day);
    days_container.innerHTML += `
    <div class="day_container">
      <div class="day">
        <h3>${month} ${day}</h3>
      </div>
      <div class="day_icon">
        <img src="weather_icons/${daily_data[i].icon}.png">
      </div>
      <div class="day_temperature">
        <h3>${daily_data[i].temperature}°C</h3>
      </div>
      <div class="summary">
        <h5>${daily_data[i].summary}</h5>
      </div>
  </div>`;
  }
};

const get_month = (date) => {
  let st = date.split("-");
  return st[1];
};

const get_day = (date) => {
  let st = date.split("-");
  return st[2];
};
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "360a8f9706msh0d09686a48efc69p1f09eajsna9c5b80a8874",
    "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com",
  },
};
