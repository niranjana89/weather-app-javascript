//SELECT  ELEMENTS
const notificationElement = document.querySelector('.notification')
const iconElement = document.querySelector('.weather-icon')
const tempValueElement = document.querySelector('.temperature-value p')
const tempDescriptionElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location p')

//INITIALIZE WEATHER OBJECT
const weather = {};

//SET DEFAULT UNIT FOR WEATHER.TEMPERATURE
weather.temperature = {
    unit:'celsius'
}

const KELVIN = 273;

//CHECK IF THE BROWSER SUPPORTS GEOLOCATION
if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p> Browser does not support geolocation </p>`
}

//IF SUPPORTED FROM ABOVE, SET USER'S POSITION 
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude)
}

//SHOW ERROR IF ANY ISSUE OCCURS
function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

//GET WEATHER INFO FROM THE API PROVIDER
function getWeather(latitude, longitude) {
    let api = `http://api.weatherstack.com/current?access_key=2b4e1af373f74ba5d1f08bbe08b53a5b&lat=&query=${latitude},${longitude}`
    fetch(api).then(function(response){
        return response.json();
    }).then(function(data) {
        
       weather.temperature.value = data.current.temperature;
       weather.description = data.current.weather_descriptions[0];
       weather.iconId = data.current.weather_icons[0];
       weather.city = data.location.region;
       weather.country = data.location.country;
       
    }).then(function(){
        displayWeather();
    })
}

//DISPLAY WEATHER 
function displayWeather() {
    iconElement.innerHTML = `<img src="${weather.iconId}" >`
    tempValueElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
    tempDescriptionElement.innerHTML = weather.description
    locationElement.innerHTML = `${weather.city}, ${weather.country} ` 
}
   


//C TO F CONVERSION
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENT
tempValueElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === 'celsius'){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempValueElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = 'fahrenheit'
    } else {
        tempValueElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = 'celsius'
    }
})







