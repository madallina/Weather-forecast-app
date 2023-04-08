const KEY = "3fd0c7ed22064a99a40104429230704 ";

const API = (lat, long) => {
  return `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lat},${long}&aqi=no
    `;
};
const APIbyCity = (city) => {
  return `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`;
};

const APIForecast = (city) => {
  return `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=5&aqi=no&alerts=no
  `;
};

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;

      fetch(API(lat, long))
        .then((res) => {
          return res.json();
        })
        .then((dataStore) => {
          document.querySelector(".temp").innerHTML = JSON.stringify(
            dataStore.current.temp_c
          );


          document.querySelector(".city").innerHTML = dataStore.location.name;

          document.querySelector(".icon").src =
            dataStore.current.condition.icon;

          let cityApi = dataStore.location.name;

          demo(cityApi);
        });
    });
  }
});

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  fetch(APIbyCity(query))
    .then((response) => response.json())
    .then((dataStore) => {
      // Clear existing search results
      searchInput.value = "";
      document.querySelector(".temp").innerHTML = JSON.stringify(
        dataStore.current.temp_c
      );

      document.querySelector(".city").innerHTML = dataStore.location.name;

      document.querySelector(".icon").src = dataStore.current.condition.icon;
      demo(dataStore.location.name);
    });
});

function demo(cityApi) {
  fetch(APIForecast(cityApi))
    .then((res) => {
      return res.json();
    })
    .then((dataStore) => {

      let forecastContainer = document.querySelector(".forecast");

      forecastContainer.innerHTML = "";

      dataStore.forecast.forecastday.forEach((day) => {
console.log(day);
        let listItem = document.createElement("li");
        let forecastTemp = document.createElement("h2");
        let forecastIcon = document.createElement("img");
        let forecastDay = document.createElement("h5");

        forecastTemp.innerHTML = day.day.avgtemp_c;
        forecastIcon.src = day.day.condition.icon;
        forecastDay.innerHTML = day.date;
        forecastContainer.appendChild(listItem);
        listItem.appendChild( forecastDay);
        listItem.appendChild(forecastTemp);
        listItem.appendChild( forecastIcon);
      });
    });
}
