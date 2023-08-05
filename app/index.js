import { Weather } from "./apiWeather.js";
import { Dom } from "./dom.js";
import { Store } from "./store.js";

const store = new Store();
const { city } = store.getLocationData();
const weather = new Weather(city);
const dom = new Dom();
weather.changeTemp();

export async function fetchWeather(){
    const data = await weather.getWeather();
    const info = await weather.twoGetWeather();
    dom.render(data);
    dom.renderTwo(info);
 
}

document.querySelector(".weather__search").addEventListener("submit", (e) => {
    let city = document.querySelector(".weather__searchform").value;
    
    //Prevent default action
    e.preventDefault();
    weather.changeCity(city);
    store.setLocationData(city);
    dom.emptyInput();
    fetchWeather();
    
})



document.addEventListener("DOMContentLoaded", fetchWeather);