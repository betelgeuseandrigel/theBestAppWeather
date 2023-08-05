import { fetchWeather } from "./index.js";
export class Weather{
    constructor(city){
        this.apiKey = '73106aedfa4c333225792873f2368773';
        this.city = city;
        this.units = "metric";
    }


    async getWeather(){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=${this.units}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async twoGetWeather(){
        const urlOne = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`;
        const responseOne = await fetch(urlOne);
        const data = await responseOne.json();
        let {lat, lon} = data.coord;
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=6&appid=${this.apiKey}`
        const response = await fetch(url);
        const info = await response.json();
        return info;
    }

    changeCity(city){
        this.city = city;
    }

    changeTemp(){
        document.querySelector(".weather__unit__celcius").addEventListener("click", () => {
            if(this.units !== "metric"){
                //Change to metric
                this.units = "metric";
                //Get weather forecast
                fetchWeather();
            }
        })
        
        document.querySelector(".weather__unit__farenheit").addEventListener("click", () => {
            if(this.units !== "imperial"){
                //Change to metric
                this.units = "imperial";
                //Get weather forecast
                fetchWeather();
            }
        })
        
    }
}