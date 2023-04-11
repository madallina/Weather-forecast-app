const KEY = "3fd0c7ed22064a99a40104429230704 ";

const APIbyLatLong = async (lat, long) => {
  try {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lat},${long}&aqi=no`
    )
      .then((res) => {
        return res.json();
      })
      .then((dataStore) => {
        displayOnFirstRun(dataStore);
      });
  } catch (error) {
    fetch(APIbyCity("Budapest"))
      .then((res) => {
        return res.json();
      })
      .then((dataStore) => {
        displayOnFirstRun(dataStore);
      });
  }
};

const APIbyCity = (city) => {
  fetch(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`)
    .then((response) => response.json())
    .then((dataStore) => {
      searchInput.value = "";
      document.querySelector(".temp").innerHTML =
        mathRound(JSON.stringify(dataStore.current.temp_c)) + "℃";

      document.querySelector(".city").innerHTML = dataStore.location.name;

      document.querySelector(".icon").src = dataStore.current.condition.icon;
      APIForecast(dataStore.location.name);
    });
};

const APIForecast = (city) => {
  fetch(`http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=5&aqi=no&alerts=no
  `)
    .then((res) => {
      return res.json();
    })
    .then((dataStore) => {
      let forecastContainer = document.querySelector(".forecast");

      forecastContainer.innerHTML = "";

      dataStore.forecast.forecastday.forEach((day) => {
        let listItem = document.createElement("li");
        let forecastTemp = document.createElement("h2");
        let forecastIcon = document.createElement("img");
        let forecastDay = document.createElement("h5");

        forecastTemp.innerHTML = mathRound(day.day.avgtemp_c) + "℃";
        forecastIcon.src = day.day.condition.icon;
        forecastDay.innerHTML = formatDate(day.date);
        forecastContainer.appendChild(listItem);
        listItem.appendChild(forecastDay);
        listItem.appendChild(forecastTemp);
        listItem.appendChild(forecastIcon);
      });
    });
};

function windowLoad() {
  let long;
  let lat;
  window.addEventListener("load", async () => {
    const position = await getLocation();
    long = position.coords.longitude;
    lat = position.coords.latitude;

    APIbyLatLong(lat, long);
    showList();
  });
}

windowLoad();

const searchButton = document.getElementById("search__button");
const searchInput = document.getElementById("search__input");

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  APIbyCity(query);
});

function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function addStringToArray() {
  if (!document.querySelector(".fav__input").value) {
    return;
  } else if (isOkNrOfCities()) {
    var inputString = document.querySelector(".fav__input").value;
    var string__array =
      JSON.parse(sessionStorage.getItem("string__array")) || [];

    string__array.push(
      inputString.charAt(0).toUpperCase() + inputString.slice(1)
    );

    sessionStorage.setItem("string__array", JSON.stringify(string__array));
    showList();
  }
}

function showList() {
  var string__array = JSON.parse(sessionStorage.getItem("string__array")) || [];
  var listElement = document.getElementById("list");

  listElement.innerHTML = "";

  string__array.forEach((string) => {
    var itemContent = document.createElement("h3");
    var listItem = document.createElement("li");
    var delete__button = document.createElement("div");
    delete__button.classList.add("delete__button");

    listItem.classList.add("fav__list");
    itemContent.classList.add("fav__city");

    itemContent.onclick = function () {
      APIForecast(string);
      APIbyCity(string);
    };

    delete__button.onclick = function () {
      let index = string__array.indexOf(string);

      string__array.splice(index, 1);
      sessionStorage.setItem("string__array", JSON.stringify(string__array));

      showList();
    };

    itemContent.innerHTML = string;
    listItem.appendChild(itemContent);
    listItem.appendChild(delete__button);
    listElement.appendChild(listItem);
  });
}

function displayOnFirstRun(dataStore) {
  document.querySelector(".temp").innerHTML =
    JSON.stringify(dataStore.current.temp_c) + "℃";

  document.querySelector(".city").innerHTML = dataStore.location.name;

  document.querySelector(".icon").src = dataStore.current.condition.icon;

  let cityApi = dataStore.location.name;

  APIForecast(cityApi);
}

function isOkNrOfCities() {
  if (JSON.parse(sessionStorage.getItem("string__array")) == null) {
    return true;
  } else {
    return (
      JSON.parse(sessionStorage.getItem("string__array").split(",")).length < 5
    );
  }
}

function changeTheme() {
  var body = document.querySelector("body");
  body.classList.toggle("body--dark");

  var favCity;
  if (document.querySelector(".fav__city")) {
    favCity = document.querySelectorAll(".fav__city");
    favCity.forEach((item) => item.classList.toggle("fav__city--dark"));
  }

  var themeTrigger = document.querySelector(".fas");
  if (themeTrigger.classList.contains("fa-moon")) {
    themeTrigger.classList.replace("fa-moon", "fa-sun");
  } else {
    themeTrigger.classList.replace("fa-sun", "fa-moon");
  }
}

function mathRound(val) {
  return Math.round(val);
}

function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  return `${day} ${month}`;
}
