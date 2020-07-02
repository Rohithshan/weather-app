/**
 * Weather App
 */

// API_KEY for maps api
window.onload = function() {

  document.getElementById('city-input').focus();
  document.getElementById('city-input').select();

}

let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

document.addEventListener('keypress', doc_keypress);

/**
 * Retrieve weather data from openweathermap
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response) => {
    return response.json();
  });
};


// if enter is pressed then the function should work 
function doc_keypress(event) {
  if(event.keyCode === 13) {
    searchCity();  
  }
}

/**
 * Retrieve city input and get the weather data
 */
searchCity = () => {
  const city = document.getElementById("city-input").value;
  removeSearch();
  document.getElementById('city-input').focus();
  document.getElementById('city-input').select();
  
  getWeatherData(city)
    .then((response) => {
      showWeatherData(response);
    })
    .catch((error) => {
      console.log(error);
      console.log("Something happened");
      removeSearch();
      document.getElementById('city-input').focus();
      document.getElementById('city-input').select();
      
    })

}

/**
 * Show the weather data in HTML
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE
  console.log(weatherData);
  if(weatherData.name != undefined){
    document.getElementById('city-name').innerText = weatherData.name;
    document.getElementById('weather-type').innerText = weatherData.weather[0].main;
    document.getElementById('temp').innerText = weatherData.main.temp;
    document.getElementById('min-temp').innerText = weatherData.main.temp_min;
    document.getElementById('max-temp').innerText = weatherData.main.temp_max;
    document.getElementById("weather-output").classList.add("visible");
    document.getElementById("img-container").src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  } else {
    document.getElementById('city-name').innerText = weatherData.name;
    document.getElementById('weather-type').innerText = '--';
    document.getElementById('temp').innerText = '--';
    document.getElementById('min-temp').innerText = '--';
    document.getElementById('max-temp').innerText = '--';
    document.getElementById("weather-output").classList.add("visible");
    document.getElementById("img-container").src = '--';
  }

  

}

function removeSearch() {
  console.log('working');
  let emptcode = `<input id="city-input" class="form-control form-control-lg" type="text" placeholder="Search city">`;
  document.getElementById('city-input-div').innerHTML = emptcode; 
}

 

