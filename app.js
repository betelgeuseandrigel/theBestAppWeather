
const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controlls");
const sectBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");


function pageTransitions() {
    //Button click active class
    for(let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener("click", function(){
            let currentBtn = document.querySelectorAll(".active-btn");
            currentBtn[0].className = currentBtn[0].className.replace("active-btn", "");
            this.className += " active-btn"; 
        })
    }

    //Sections active
    allSections.addEventListener("click", (e)=>{
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other btn
            sectBtns.forEach((btn)=>{
                btn.classList.remove('active');
            })
            e.target.classList.add('active');

            //Hide other sections
            sections.forEach((section)=>{
                section.classList.remove('active');
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

    //toggle them
    const themeBtn = document.querySelector(".theme-btn");
    themeBtn.addEventListener("click", () => {
        let element = document.body;
        element.classList.toggle("other-mode");
    })
}

pageTransitions();

let ubicacionPrincipal = window.scrollY;
window.addEventListener("scroll", function(){
    let desplazamientoActual = window.scrollY;
    if(ubicacionPrincipal >= desplazamientoActual){
        document.getElementsByTagName("nav")[0].style.top = "0px"
    }else{
        document.getElementsByTagName("nav")[0].style.top = "-100px"
    }
    ubicacionPrincipal= desplazamientoActual;
})


const timeZone = document.getElementById("time-zone");
const country = document.getElementById("country");
const nameCity = document.querySelector(".name");
const timeDate = document.querySelector(".date-time-one");
const weatherForecastEl = document.querySelector(".weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const forecastOne = document.querySelector(".forecast");
const weatherForecastItem = document.querySelector(".weather-forecast-item");
const currentWeatherEl = document.getElementById("current-weather-items");
const formularioUI = document.querySelector(".weather__search");


let currCity = "";
let units = "metric";



const apiKey = '73106aedfa4c333225792873f2368773';
const apiUrl ='https://api.openweathermap.org/data/2.5/weather?';
const apiUrlDos = 'https://api.openweathermap.org/data/2.5/forecast?&cnt=5';


async function checkWeather(){
    const response = await fetch(apiUrl + `units=${units}` + `&q=${currCity}`+ `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".description").style.display = "none";     
        document.querySelector(".forecast").style.display = "none";
        document.querySelector(".today").style.display = "none";
        document.querySelector(".secThree").style.display = "none";
        document.querySelector(".weather__units").style.display = "none";
 
    }else{
       


        let data = await response.json();
        function convertTimeStamp(timestamp, timezone){
        const convertTimeZone = timezone / 3600;//Converts seconds to hours
    
        const date = new Date(timestamp * 1000);
    
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(convertTimeZone)}`,
            hour12: true
        }
    
        return date.toLocaleString("en-US", options);
        }
        
        let {humidity, pressure} = data.main;
        let {sunrise, sunset} = data.sys;
    
        currentWeatherEl.innerHTML = `
        <div class="weather-item">
            <div>Humidity:</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-item">
            <div>Pressure:</div>
            <div>${pressure} hPa</div>
        </div>
        <div class="weather-item">
            <div>Wind speed:</div>
            <div>${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}</div>
        </div>
        <div class="weather-item">
            <div>Sunrise:</div>
            <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <div>Sunset:</div>
            <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
        </div>`
    
        currentTempEl.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(data.dt * 1000).format('dddd')}</div>
                <div class="temp">Temp - ${Math.round(data.main.temp)} ${units === "imperial" ? "&#176F" : "&#176C"}</div>
                <div class="temp">Fls-like - ${Math.round(data.main.feels_like)} ${units === "imperial" ? "&#176F" : "&#176C"}</div>
            </div>`
    
    
        //Convert country code to name
        function convertCountryCode(country){
        let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
        return regionNames.of(country)
        }
    
    
       timeZone.innerHTML = `${convertCountryCode(data.sys.country)}`;
       country.innerHTML = data.coord.lat + "N" + data.coord.lon + "E";
       nameCity.innerHTML = `${data.name}`;
       timeDate.innerHTML = convertTimeStamp(data.dt, data.timezone);
    
    
            twoWeatherData();
            async function twoWeatherData(){
            let {lat, lon} = data.coord;
            const res = await fetch(apiUrlDos +  `&units=${units}` +`&lat=${lat}` + `&lon=${lon}` + `&appid=${apiKey}`);
            let info = await res.json();
            twoShowWeatherData(info); 
            } 
            
    
    
            function twoShowWeatherData(info){
    
                document.querySelector(".one-forecast").innerHTML = `
                <div class="day">${window.moment(info.list[0].dt * 1000).format('HH:mm a')}</div>
                <img src="https://openweathermap.org/img/wn/${info.list[0].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
                <div class="temp">Temp - ${Math.round(info.list[0].main.temp)}&#176; C</div>
                <div class="temp">Fls-like - ${Math.round(info.list[0].main.feels_like)}&#176; C</div>
                `;
                document.querySelector(".two-forecast").innerHTML = `
                <div class="day">${window.moment(info.list[1].dt * 1000).format('HH:mm a')}</div>
                <img src="https://openweathermap.org/img/wn/${info.list[1].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
                <div class="temp">Temp - ${Math.round(info.list[1].main.temp)}&#176; C</div>
                <div class="temp">Fls-like - ${Math.round(info.list[1].main.feels_like)}&#176; C</div>
                `;
                document.querySelector(".three-forecast").innerHTML = `
                <div class="day">${window.moment(info.list[2].dt * 1000).format('HH:mm a')}</div>
                <img src="https://openweathermap.org/img/wn/${info.list[2].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
                <div class="temp">Temp - ${Math.round(info.list[2].main.temp)}&#176; C</div>
                <div class="temp">Fls-like - ${Math.round(info.list[2].main.feels_like)}&#176; C</div>
                `;
                document.querySelector(".four-forecast").innerHTML = `
                <div class="day">${window.moment(info.list[3].dt * 1000).format('HH:mm a')}</div>
                <img src="https://openweathermap.org/img/wn/${info.list[3].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
                <div class="temp">Temp - ${Math.round(info.list[3].main.temp)}&#176; C</div>
                <div class="temp">Fls-like - ${Math.round(info.list[3].main.feels_like)}&#176; C</div>
                `;
                document.querySelector(".five-forecast").innerHTML = `
                <div class="day">${window.moment(info.list[4].dt * 1000).format('HH:mm a')}</div>
                <img src="https://openweathermap.org/img/wn/${info.list[4].weather[0].icon}@2x.png" alt="weather icon" class="w-icon"> 
                <div class="temp">Temp - ${Math.round(info.list[4].main.temp)}&#176; C</div>
                <div class="temp">Fls-like - ${Math.round(info.list[4].main.feels_like)}&#176; C</div>
                `;
       
          
    
                document.querySelector(".error").style.display = "none";
                document.querySelector(".description").style.display = "flex";
                document.querySelector(".forecast").style.display = "flex";
                document.querySelector(".today").style.display = "flex";
                document.querySelector(".secThree").style.display = "flex";
                document.querySelector(".weather__units").style.display = "flex";
        
            }
     
    }
    }



formularioUI.addEventListener("submit", e => {
    let search = document.querySelector(".weather__searchform").value;
    
    //Prevent default action
    e.preventDefault();
    //Change current city
    currCity = search;
    //Get weather forecast
    checkWeather()
    //Clear form
    formularioUI.reset();
});

//units
document.querySelector(".weather__unit__celcius").addEventListener("click", () => {
    if(units !== "metric"){
        //Change to metric
        units = "metric";
        //Get weather forecast
        checkWeather()
    }
})

document.querySelector(".weather__unit__farenheit").addEventListener("click", () => {
    if(units !== "imperial"){
        //Change to metric
        units = "imperial";
        //Get weather forecast
        checkWeather()
    }
})


