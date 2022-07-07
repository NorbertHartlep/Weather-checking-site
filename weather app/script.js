let weather = {
"apiKey" : "e950cc87bbde96caf88fb52e2d99bcc7",
fetchWeather : function(city){
fetch(
"https://api.openweathermap.org/data/2.5/weather?q="
 + city 
 + "&units=metric&appid=" 
 + this.apiKey)
.then((response) => response.json())
.then((data) => this.displayWeather(data));
},
//function displaying data from api on screen and changing background image to city related
displayWeather : function(data){
const {name} = data;
const {icon, description} = data.weather[0];
const {temp,humidity} = data.main;
const {speed} = data.wind;
console.log(name,icon,description,temp,humidity,speed);
document.querySelector(".city").innerText = "Weather in " + name;
document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
document.querySelector(".description").innerText = description;
document.querySelector(".temp").innerText = Math.round(temp) + "°C";
document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
document.querySelector(".wind").innerText = "Wind speed: " + Math.round(speed) + "km/h";
document.querySelector(".weather").classList.remove("loading");
document.body.style.backgroundImage = "url('https://source.unsplash.com/1980x1080/?" + name +"')";
if(temp < 5){
document.querySelector(".tip").innerText = "Better dress warmly!";
}
else if(temp > 5 && temp < 20){
    document.querySelector(".tip").innerText = "It's normal temperature!";
}
else
    document.querySelector(".tip").innerText = "It's too hot outside, remember about drinking water!";
},
// let the search take value from our input
search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
}
};
// let button trigger the function
document.querySelector(".search button").addEventListener("click", function(){
weather.search();
});
//same as up but on enter button instead of clicking on search
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    };
    
});
weather.fetchWeather("Warsaw");

