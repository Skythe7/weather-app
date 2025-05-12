// API key and url (openweathermap.org)
const apiKey = '91a2ecada71cf78012e295fc4b43673f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';


// HTML
const searchBox = document.querySelector('.search-bar');
const searchB = document.querySelector('.search button');
const weatherIcon = document.querySelector('.img-container img');


// Checks the weather using the api url
async function checkWeather(city) {
  // Grabs infomation from url
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  const data = await response.json();

  // if there's an error
  if (response.status == 404) {
    document.querySelector('.city').innerHTML = 'Invalid city name!';
    document.querySelector('.city').style.color = 'red';
    return
  } else {
    document.querySelector('.city').style.color = 'white';
  }

  // Changes UI according to information
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '&#176;C';
  document.querySelector('.humidity-percentage').innerHTML = data.main.humidity;
  document.querySelector('.wind-percentage').innerHTML = data.wind.speed;

  // Changes weather image according to information
  if (data.weather[0].main === 'Clouds') {
    weatherIcon.src = 'images/clouds.png';
  } else if (data.weather[0].main === 'Clear') {
    weatherIcon.src = 'images/clear.png'
  } else if (data.weather[0].main == 'Rain') {
    weatherIcon.src = 'images/rain.png'
  } else if (data.weather[0].main == 'Drizzle') {
    weatherIcon.src = 'images/drizzle.png'
  } else if (data.weather[0].main == 'Mist') {
    weatherIcon.src = 'images/mist.png'
  }

  document.querySelector('.information').style.display = 'block'
}

// whenever search button clicks it will emit the checkWeather() function
searchB.addEventListener('click',  ()=>{
  const cityValue = searchBox.value;

  checkWeather(cityValue);
})